import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

export function ErrorPage() {
  return (
    <div className="min-h-screen bg-background grid place-items-center p-6">
      <div className="w-full max-w-md text-center space-y-4">
        <div className="text-4xl font-black text-text-primary">500</div>
        <div className="text-lg font-bold">Something went wrong</div>
        <p className="text-sm text-text-secondary">
          Please try again. If the problem persists, contact TagWraps support.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/dashboard">
            <Button>Go back</Button>
          </Link>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    </div>
  )
}

