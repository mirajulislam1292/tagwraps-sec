import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const schema = z
  .object({
    full_name: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Choose a password with at least 8 characters'),
    confirm_password: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export function RegisterPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await api.post('/api/v1/auth/register', {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      })
      toast.success('Registration successful. Check your email to verify.')
      navigate('/verify-email', { replace: true, state: { email: values.email } })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Register with your company email to access TagWraps Sec."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">Full name</label>
          <Input type="text" placeholder="Jane Doe" {...register('full_name')} />
          {errors.full_name && <p className="mt-2 text-sm text-danger">{errors.full_name.message}</p>}
        </div>

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

        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">Confirm password</label>
          <Input type="password" placeholder="••••••••" {...register('confirm_password')} />
          {errors.confirm_password && <p className="mt-2 text-sm text-danger">{errors.confirm_password.message}</p>}
        </div>

        <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link className="text-text-primary hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

