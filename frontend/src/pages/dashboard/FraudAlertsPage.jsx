import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function FraudAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fraud Alerts</h1>
        <p className="text-sm text-text-secondary">
          Urgent, card-based alert center with resolve workflow.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Coming next.</div>
        </CardContent>
      </Card>
    </div>
  )
}

