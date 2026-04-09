import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

export function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">NFC Tags</h1>
          <p className="text-sm text-text-secondary">Manage tag lifecycle: active, locked, flagged.</p>
        </div>
        <Link to="/dashboard/tags/generate">
          <Button>Generate NFC Tags</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Tag table + detail modal will be wired to backend next.</div>
        </CardContent>
      </Card>
    </div>
  )
}

