import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const password = z
  .string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/)

const schema = z
  .object({
    password,
    confirm_password: z.string().min(1),
  })
  .refine((v) => v.password === v.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export function ResetPasswordPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values) {
    try {
      await api.post(`/api/v1/auth/reset-password/${token}`, { password: values.password })
      toast.success('Password updated. Please sign in.')
      navigate('/login', { replace: true })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Reset failed')
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
            <CardTitle>Reset password</CardTitle>
            <p className="text-sm text-text-secondary mt-1">Choose a strong new password.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-sm font-medium">New password</label>
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
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Updating…' : 'Update password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

