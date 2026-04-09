import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/layout/PageHeader'
import { EmptyState } from '../../components/ui/empty-state'
import { Activity } from 'lucide-react'

export function ScanLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Telemetry"
        title="Scan Logs"
        subtitle="Filterable scan history with export and stats."
      />
      <Card>
        <CardHeader>
          <CardTitle>All scans</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Activity size={18} />}
            title="No scans recorded"
            description="Once customers verify tags, scans will appear here with device/location metadata."
          />
        </CardContent>
      </Card>
    </div>
  )
}

