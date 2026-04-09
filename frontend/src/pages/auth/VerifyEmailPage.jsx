import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../services/api'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

function OtpBoxes({ value, onChange }) {
  const digits = useMemo(() => value.split('').concat(Array(6).fill('')).slice(0, 6), [value])
  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, idx) => (
        <Input
          key={idx}
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => {
            const next = e.target.value.replace(/\D/g, '').slice(-1)
            const arr = value.split('')
            arr[idx] = next
            const joined = arr.join('').slice(0, 6)
            onChange(joined)
            if (next && e.target.nextElementSibling) e.target.nextElementSibling.focus()
          }}
          className="w-12 text-center text-lg font-bold"
        />
      ))}
    </div>
  )
}

export function VerifyEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [otp, setOtp] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  async function onVerify() {
    try {
      setLoading(true)
      await api.post('/api/v1/auth/verify-email', { email, otp })
      toast.success('Email verified. Please sign in.')
      navigate('/login', { replace: true })
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  async function onResend() {
    try {
      setCooldown(60)
      await api.post('/api/v1/auth/resend-otp', { email })
      toast.success('OTP sent')
    } catch (e) {
      setCooldown(0)
      toast.error(e?.response?.data?.error || 'Resend failed')
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
            <CardTitle>Verify email</CardTitle>
            <p className="text-sm text-text-secondary mt-1">
              Enter the 6-digit code (expires in 15 minutes).
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <OtpBoxes value={otp} onChange={setOtp} />

            <Button className="w-full" onClick={onVerify} disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying…' : 'Verify'}
            </Button>

            <Button
              variant="secondary"
              className="w-full"
              onClick={onResend}
              disabled={!email || cooldown > 0}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

