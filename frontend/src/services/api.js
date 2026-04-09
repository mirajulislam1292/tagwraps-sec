import axios from 'axios'

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

export const api = axios.create({
  // In production we MUST use same-origin so Vercel rewrites `/api/*` to the backend.
  // Otherwise the browser can't read the CSRF cookie (different domain), and auth POSTs fail.
  baseURL: import.meta.env.PROD
    ? ''
    : import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const csrf = getCookie('csrf_token')
  if (csrf) config.headers['x-csrf-token'] = csrf
  return config
})

let refreshing = null
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error?.response?.status === 401 && !original?._retry) {
      original._retry = true
      try {
        if (!refreshing) {
          refreshing = api.post('/api/v1/auth/refresh').finally(() => {
            refreshing = null
          })
        }
        await refreshing
        return api(original)
      } catch {
        // fall through
      }
    }
    return Promise.reject(error)
  }
)

