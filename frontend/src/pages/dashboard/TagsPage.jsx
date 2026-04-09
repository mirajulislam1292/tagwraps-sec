import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { EmptyState } from '../../components/ui/empty-state'
import { Cpu } from 'lucide-react'

export function TagsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="NFC"
        title="NFC Tags"
        subtitle="Manage tag lifecycle: active, locked, flagged."
        right={
          <Link to="/dashboard/tags/generate">
            <Button>Generate NFC Tags</Button>
          </Link>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Cpu size={18} />}
            title="No tags yet"
            description="Generate a batch, write them to physical NFC chips, then scans will start appearing here."
            actionLabel="Generate a batch"
            onAction={() => (window.location.href = '/dashboard/tags/generate')}
          />
        </CardContent>
      </Card>
    </div>
  )
}

