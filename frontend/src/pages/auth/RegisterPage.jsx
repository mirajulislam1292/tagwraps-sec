import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const password = z.string().min(8, 'Password must be at least 8 characters')

const schema = z
  .object({
    full_name: z.string().min(2),
    email: z.string().email(),
    password,
    confirm_password: z.string().min(1),
    company_name: z.string().min(2),
    country: z.string().min(2),
  })
  .refine((v) => v.password === v.confirm_password, {
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
        company_name: values.company_name,
        country: values.country,
      })
      toast.success('Check your email for verification code')
      navigate('/verify-email', { replace: true, state: { email: values.email } })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <AuthShell
      title="Start securing your products."
      subtitle="Create a manufacturer account to register products, generate NFC tag identities, and monitor scans and fraud alerts."
    >
      <Card className="backdrop-blur bg-white/80">
        <CardHeader>
          <CardTitle>Create manufacturer account</CardTitle>
          <p className="text-sm text-text-secondary mt-1">
            Register your company to start generating TagWraps NFC identities.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium">Full name</label>
              <Input {...register('full_name')} />
              {errors.full_name ? (
                <p className="text-sm text-danger mt-1">{errors.full_name.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input {...register('email')} />
              {errors.email ? (
                <p className="text-sm text-danger mt-1">{errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input type="password" {...register('password')} />
              {errors.password ? (
                <p className="text-sm text-danger mt-1">{errors.password.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Confirm password</label>
              <Input type="password" {...register('confirm_password')} />
              {errors.confirm_password ? (
                <p className="text-sm text-danger mt-1">{errors.confirm_password.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Company name</label>
              <Input {...register('company_name')} />
              {errors.company_name ? (
                <p className="text-sm text-danger mt-1">{errors.company_name.message}</p>
              ) : null}
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input placeholder="Bangladesh" {...register('country')} />
              {errors.country ? (
                <p className="text-sm text-danger mt-1">{errors.country.message}</p>
              ) : null}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create account'}
            </Button>

            <p className="text-sm text-text-secondary text-center">
              Already have an account?{' '}
              <Link className="text-primary hover:underline" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  )
}

