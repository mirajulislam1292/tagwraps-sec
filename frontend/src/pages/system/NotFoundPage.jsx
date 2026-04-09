import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background grid place-items-center p-6">
      <div className="w-full max-w-md text-center space-y-4">
        <div className="text-4xl font-black text-text-primary">404</div>
        <div className="text-lg font-bold">Page not found</div>
        <p className="text-sm text-text-secondary">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/dashboard">
            <Button>Go back to dashboard</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
        <div className="pt-2 flex justify-center">
          <BrandMark />
        </div>
      </div>
    </div>
  )
}

