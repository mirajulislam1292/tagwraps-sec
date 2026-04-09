import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { useAuth } from '../../store/auth'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('')
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
      await reload()
      const me = await api.get('/api/v1/auth/me')
      const role = me.data.user?.role
      if (role === 'SUPER_ADMIN') navigate('/admin/dashboard', { replace: true })
      else navigate('/dashboard', { replace: true })
    } catch (e) {
      setErrorMessage(e?.response?.data?.error || 'Unable to sign in. Check your credentials.')
      toast.error(errorMessage || 'Unable to sign in')
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your TagWraps Sec dashboard with your email and password."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="mt-2 text-sm text-danger">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">Password</label>
          <Input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <p className="mt-2 text-sm text-danger">{errors.password.message}</p>}
        </div>

        {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-text-secondary hover:text-text-primary">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <p className="text-center text-sm text-text-secondary">
          New to TagWraps Sec?{' '}
          <Link to="/register" className="text-text-primary hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

