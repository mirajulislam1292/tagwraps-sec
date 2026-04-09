import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/layout/PageHeader'
import { EmptyState } from '../../components/ui/empty-state'
import { ShieldAlert } from 'lucide-react'

export function FraudAlertsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Security"
        title="Fraud Alerts"
        subtitle="Investigation queue for suspicious scans and invalid signatures."
      />
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<ShieldAlert size={18} />}
            title="No alerts"
            description="When duplicates or invalid signatures occur, alerts will show up here to resolve."
          />
        </CardContent>
      </Card>
    </div>
  )
}

