import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const schema = z.object({ email: z.string().email() })

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await api.post('/api/v1/auth/forgot-password', values)
      toast.success('If the email exists, a reset link was sent')
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Request failed')
    }
  }

  return (
    <div className="min-h-screen bg-background grid place-items-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <BrandMark />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
            <p className="text-sm text-text-secondary mt-1">
              We’ll email you a reset link (expires in 1 hour).
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input {...register('email')} />
                {errors.email ? (
                  <p className="text-sm text-danger mt-1">{errors.email.message}</p>
                ) : null}
              </div>
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send reset link'}
              </Button>
              <p className="text-sm text-text-secondary text-center">
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

