import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Lock, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { Button } from '../../components/ui/button'

function OtpBoxes({ value, onChange, error }) {
  const digits = useMemo(() => value.split('').concat(Array(6).fill('')).slice(0, 6), [value])

  const handleInput = (idx, inputValue) => {
    const next = inputValue.replace(/\D/g, '').slice(-1)
    const arr = value.split('')
    arr[idx] = next
    const joined = arr.join('').slice(0, 6)
    onChange(joined)
    // Auto-focus next box
    if (next && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-${idx - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, idx) => (
        <input
          key={idx}
          id={`otp-${idx}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleInput(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg bg-surface focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-danger focus:ring-danger/30 animate-pulse'
              : 'border-border focus:border-primary focus:ring-primary/15'
          }`}
        />
      ))}
    </div>
  )
}

export function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email] = useState(location.state?.email || 'user@email.com')
  const [otp, setOtp] = useState('')
  const [cooldown, setCooldown] = useState(272) // 4:32
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify()
    }
  }, [otp])

  async function handleVerify() {
    if (otp.length !== 6) return

    try {
      setLoading(true)
      setError('')
      await api.post('/api/v1/auth/verify-email', { email, otp })
      setSuccess(true)
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } catch (e) {
      setError('Invalid code. 2 attempts remaining.')
      setOtp('')
      // Shake animation
      const container = document.getElementById('otp-container')
      if (container) {
        container.classList.add('animate-pulse')
        setTimeout(() => container.classList.remove('animate-pulse'), 500)
      }
    } finally {
      setLoading(false)
    }
  }

  async function onResend() {
    try {
      setCooldown(272)
      await api.post('/api/v1/auth/resend-otp', { email })
      toast.success('Code sent')
    } catch (e) {
      toast.error('Resend failed')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background grid place-items-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-green-800 mb-2">Email verified!</h2>
            <p className="text-green-700">Redirecting to sign in…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background grid place-items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-xl shadow-card p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Verify your email</h2>
            <p className="text-text-secondary">
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
            </p>
          </div>

          <div id="otp-container" className="mb-6">
            <OtpBoxes value={otp} onChange={setOtp} error={!!error} />
            {error && <p className="text-sm text-danger text-center mt-2">{error}</p>}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-text-secondary">
              Code expires in <span className={`font-medium ${cooldown < 60 ? 'text-danger' : 'text-text-primary'}`}>
                {formatTime(cooldown)}
              </span>
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={onResend}
              disabled={cooldown > 0}
              className={`text-sm font-medium transition-colors ${
                cooldown > 0
                  ? 'text-text-secondary cursor-not-allowed'
                  : 'text-primary hover:underline'
              }`}
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

