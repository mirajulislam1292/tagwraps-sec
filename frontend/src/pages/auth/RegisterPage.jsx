import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { AuthShell } from '../../components/layout/AuthShell'
import { Button } from '../../components/ui/button'

const password = z.string().min(8, 'Password must be at least 8 characters')

const schema = z
  .object({
    full_name: z.string().min(2),
    email: z.string().email(),
    password,
    confirm_password: z.string().min(1),
    agree_terms: z.boolean().refine(v => v, 'You must agree to the terms'),
  })
  .refine((v) => v.password === v.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

function getPasswordStrength(password) {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return strength
}

function getPasswordStrengthLabel(strength) {
  if (strength <= 1) return { label: 'Weak', color: 'bg-red-500' }
  if (strength <= 2) return { label: 'Fair', color: 'bg-yellow-500' }
  if (strength <= 3) return { label: 'Good', color: 'bg-blue-500' }
  return { label: 'Strong', color: 'bg-green-500' }
}

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const passwordValue = watch('password', '')
  const passwordStrength = getPasswordStrength(passwordValue)
  const strengthInfo = getPasswordStrengthLabel(passwordStrength)

  async function onSubmit(values) {
    try {
      await api.post('/api/v1/auth/register', {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      })
      toast.success('Account created successfully!')
      navigate('/verify', { replace: true, state: { email: values.email } })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <AuthShell
      title="Start securing your products."
      subtitle="Create a manufacturer account to register products, generate NFC tag identities, and monitor scans and fraud alerts."
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-text-primary">Create your account</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="relative">
            <input
              {...register('full_name')}
              type="text"
              className="peer w-full h-12 px-4 pt-6 pb-2 border border-border rounded-lg bg-surface text-text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              placeholder="Full Name"
            />
            <label className="absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
              Full Name
            </label>
            {errors.full_name && <p className="text-sm text-danger mt-1">{errors.full_name.message}</p>}
          </div>

          {/* Email */}
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

          {/* Password */}
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
            {passwordValue && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary">Password strength:</span>
                  <span className={`font-medium ${strengthInfo.label === 'Weak' ? 'text-red-500' : strengthInfo.label === 'Fair' ? 'text-yellow-500' : strengthInfo.label === 'Good' ? 'text-blue-500' : 'text-green-500'}`}>
                    {strengthInfo.label}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-1">
                  <div className={`h-1 rounded-full transition-all ${strengthInfo.color}`} style={{ width: `${(passwordStrength / 5) * 100}%` }} />
                </div>
              </div>
            )}
            {errors.password && <p className="text-sm text-danger mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              {...register('confirm_password')}
              type={showConfirmPassword ? 'text' : 'password'}
              className="peer w-full h-12 px-4 pr-12 pt-6 pb-2 border border-border rounded-lg bg-surface text-text-primary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              placeholder="Confirm Password"
            />
            <label className="absolute left-4 top-2 text-xs text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary">
              Confirm Password
            </label>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.confirm_password && <p className="text-sm text-danger mt-1">{errors.confirm_password.message}</p>}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              {...register('agree_terms')}
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary/15"
            />
            <label className="text-sm text-text-secondary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>
          {errors.agree_terms && <p className="text-sm text-danger">{errors.agree_terms.message}</p>}

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Creating Account…
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <p className="text-sm text-text-secondary text-center">
            Already have an account?{' '}
            <Link className="text-primary hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  )
}

