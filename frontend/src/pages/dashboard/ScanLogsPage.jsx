import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function ScanLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scan Logs</h1>
        <p className="text-sm text-text-secondary">
          Filterable scan history with CSV export and stats.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Coming next.</div>
        </CardContent>
      </Card>
    </div>
  )
}

