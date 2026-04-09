import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-text-secondary">
          Company profile, security, notifications, and API access.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Company profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Coming next.</div>
        </CardContent>
      </Card>
    </div>
  )
}

