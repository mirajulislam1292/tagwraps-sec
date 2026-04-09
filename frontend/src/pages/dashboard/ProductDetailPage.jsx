import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function ProductDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Product detail</h1>
        <p className="text-sm text-text-secondary">
          Shows product info, tag table, scans chart, and fraud stats.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Loading / empty / error states will be implemented with real data.</div>
        </CardContent>
      </Card>
    </div>
  )
}

