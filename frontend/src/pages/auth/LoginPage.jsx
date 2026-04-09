import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { useAuth } from '../../store/auth'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const navigate = useNavigate()
  const { reload } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await api.post('/api/v1/auth/login', values)
      const me = await api.get('/api/v1/auth/me')
      await reload()
      const role = me.data.user?.role
      if (role === 'SUPER_ADMIN') navigate('/admin/dashboard', { replace: true })
      else navigate('/dashboard', { replace: true })
    } catch (e) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      toast.error(e?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <AuthShell
      title="Secure authentication for real-world products."
      subtitle="TagWraps Sec is the cryptographic control center for manufacturers — product registry, NFC identity generation, scan intelligence, and fraud response."
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-text-primary">Welcome back</h2>
          <p className="mt-2 text-text-secondary">Sign in to your TagWraps Sec account.</p>
        </div>

        <form className={`space-y-6 ${isShaking ? 'animate-pulse' : ''}`} onSubmit={handleSubmit(onSubmit)}>
          {/* Google OAuth */}
          <Button type="button" variant="secondary" className="w-full h-12 text-base">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-2 text-text-secondary">or sign in with email</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              className="peer w-full h-12 px-4 pt-6 pb-2 border border-border rounded-lg bg-surface text-text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              placeholder="Email"
            />
            <label className="absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
              Email
            </label>
            {errors.email && <p className="text-sm text-danger mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="peer w-full h-12 px-4 pr-12 pt-6 pb-2 border border-border rounded-lg bg-surface text-text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              placeholder="Password"
            />
            <label className="absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
              Password
            </label>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.password && <p className="text-sm text-danger mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <Link className="text-sm text-primary hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <p className="text-sm text-text-secondary text-center">
            Don't have an account?{' '}
            <Link className="text-primary hover:underline" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  )
}

