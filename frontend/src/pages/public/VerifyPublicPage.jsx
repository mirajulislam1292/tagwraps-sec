import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { Spinner } from '../../components/ui/spinner'
import { Button } from '../../components/ui/button'
import { BrandMark } from '../../components/layout/BrandMark'

export function VerifyPublicPage() {
  const { tag_uid } = useParams()
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        const res = await api.get(`/api/v1/verify/${encodeURIComponent(tag_uid)}`, {
          withCredentials: false,
        })
        if (!mounted) return
        setState({ status: 'success', data: res.data })
      } catch (e) {
        if (!mounted) return
        setState({ status: 'error', error: e?.message || 'Verification failed' })
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [tag_uid])

  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-background grid place-items-center p-6">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="mx-auto w-fit">
            <Spinner label="Verifying your product…" />
          </div>
          <p className="text-sm text-text-secondary">
            Please wait while we check the TagWraps cryptographic signature.
          </p>
        </div>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="min-h-screen bg-background grid place-items-center p-6">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="text-danger text-5xl font-black">×</div>
          <h1 className="text-xl font-bold">Something went wrong</h1>
          <p className="text-sm text-text-secondary">{state.error}</p>
          <div className="flex justify-center">
            <BrandMark />
          </div>
        </div>
      </div>
    )
  }

  const { result, product } = state.data
  const isGenuine = result === 'GENUINE'
  const isFake = result === 'FAKE'
  const isFlagged = result === 'FLAGGED'

  const headline = isGenuine
    ? 'GENUINE PRODUCT'
    : isFake
      ? 'WARNING: Cannot Verify This Product'
      : 'SUSPICIOUS PRODUCT'

  const badge = isGenuine ? '✓' : isFake ? '✕' : '!'
  const color = isGenuine ? 'text-success' : isFake ? 'text-danger' : 'text-warning'

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-surface border border-border shadow-card overflow-hidden">
          <div className="p-6 text-center">
            <div className={`text-6xl font-black ${color}`}>{badge}</div>
            <div className={`mt-3 text-lg font-bold ${color}`}>{headline}</div>
            <p className="mt-2 text-sm text-text-secondary">
              {isGenuine
                ? 'This product is verified authentic by TagWraps.'
                : isFake
                  ? 'This product could not be verified. Do not use it. Report to TagWraps.'
                  : 'This tag has been flagged for suspicious activity.'}
            </p>
          </div>

          {product ? (
            <div className="px-6 pb-6">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-xl border border-border"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-56 rounded-xl border border-border bg-background grid place-items-center text-text-secondary text-sm">
                  No product image
                </div>
              )}
              <div className="mt-4">
                <div className="text-lg font-bold">{product.name}</div>
                <div className="text-sm text-text-secondary">
                  {product.brand} · {product.manufacturer}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-border bg-white p-3">
                  <div className="text-xs text-text-secondary">Batch</div>
                  <div className="font-medium">{product.batch_number || '—'}</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-3">
                  <div className="text-xs text-text-secondary">Category</div>
                  <div className="font-medium">{product.category || '—'}</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-3">
                  <div className="text-xs text-text-secondary">Manufactured</div>
                  <div className="font-medium">
                    {product.manufacture_date ? product.manufacture_date.slice(0, 10) : '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-white p-3">
                  <div className="text-xs text-text-secondary">Expiry</div>
                  <div className="font-medium">
                    {product.expiry_date ? product.expiry_date.slice(0, 10) : '—'}
                  </div>
                </div>
              </div>

              {!isGenuine ? (
                <div className="mt-4">
                  <Button className="w-full" variant="secondary" onClick={() => alert('Report flow coming next.')}>
                    Report to TagWraps
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-center">
          <BrandMark />
        </div>
      </div>
    </div>
  )
}

