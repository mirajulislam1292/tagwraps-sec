import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { useAuth } from '../../store/auth'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
})

export function LoginPage() {
  const navigate = useNavigate()
  const { reload } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { remember: true } })

  async function onSubmit(values) {
    try {
      await api.post('/api/v1/auth/login', values)
      const me = await api.get('/api/v1/auth/me')
      await reload()
      const role = me.data.user?.role
      if (role === 'SUPER_ADMIN') navigate('/admin/dashboard', { replace: true })
      else navigate('/dashboard', { replace: true })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <AuthShell
      title="Secure authentication for real-world products."
      subtitle="TagWraps Sec is the cryptographic control center for manufacturers — product registry, NFC identity generation, scan intelligence, and fraud response."
    >
      <Card className="backdrop-blur bg-white/80">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <p className="text-sm text-text-secondary mt-1">Access your TagWraps Sec dashboard.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="you@company.com" {...register('email')} />
              {errors.email ? (
                <p className="text-sm text-danger mt-1">{errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" {...register('password')} />
              {errors.password ? (
                <p className="text-sm text-danger mt-1">{errors.password.message}</p>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" className="h-4 w-4" {...register('remember')} />
                Remember me
              </label>
              <Link className="text-sm text-primary hover:underline" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>

            <p className="text-sm text-text-secondary text-center">
              New manufacturer?{' '}
              <Link className="text-primary hover:underline" to="/register">
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  )
}

