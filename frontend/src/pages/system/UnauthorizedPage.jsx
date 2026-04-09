import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background grid place-items-center p-6">
      <div className="w-full max-w-md text-center space-y-4">
        <div className="text-4xl font-black text-danger">403</div>
        <div className="text-lg font-bold">Unauthorized</div>
        <p className="text-sm text-text-secondary">
          You don’t have permission to access this page.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

