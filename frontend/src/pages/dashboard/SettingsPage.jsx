import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/layout/PageHeader'
import { Badge } from '../../components/ui/badge'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        subtitle="Company profile, security, notifications, and API access."
      />
      <Card>
        <CardHeader>
          <CardTitle>Company profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-text-primary">Manufacturer onboarding</div>
              <div className="mt-1 text-sm text-text-secondary">
                Approval, plan, and tag quota are managed by the Super Admin.
              </div>
            </div>
            <Badge variant="warning">Wiring backend next</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

