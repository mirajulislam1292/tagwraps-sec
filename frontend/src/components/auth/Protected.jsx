import { Navigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { Spinner } from '../ui/spinner'

export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Spinner label="Loading session…" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function RequireRole({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to="/unauthorized" replace />
  return children
}

