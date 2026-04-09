import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-text-secondary">Overview of products, tags, scans, and alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {['Total Products', 'Total NFC Tags', 'Total Scans', 'Active Fraud Alerts'].map((t) => (
          <Card key={t}>
            <CardHeader>
              <CardTitle className="text-sm">{t}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">—</div>
              <p className="text-xs text-text-secondary mt-1">Connect backend endpoints next.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">
            Empty state: no scan logs yet. Once tags are locked and scanned, activity will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

