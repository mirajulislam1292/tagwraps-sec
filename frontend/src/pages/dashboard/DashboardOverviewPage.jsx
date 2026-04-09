import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldAlert, Cpu, Box } from 'lucide-react'

export function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manufacturer"
        title="Dashboard"
        subtitle="Overview of products, tags, scans, and alerts."
        right={
          <>
            <Link to="/dashboard/products/new">
              <Button variant="secondary">New product</Button>
            </Link>
            <Link to="/dashboard/tags/generate">
              <Button>
                Generate tags <ArrowRight size={16} />
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { t: 'Total Products', icon: <Box size={16} className="text-primary" /> },
          { t: 'Total NFC Tags', icon: <Cpu size={16} className="text-primary" /> },
          { t: 'Total Scans', icon: <ArrowRight size={16} className="text-primary" /> },
          { t: 'Active Fraud Alerts', icon: <ShieldAlert size={16} className="text-danger" /> },
        ].map((x) => (
          <Card key={x.t} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-sm">{x.t}</CardTitle>
                <div className="h-8 w-8 rounded-xl border border-border bg-white grid place-items-center">
                  {x.icon}
                </div>
              </div>
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

