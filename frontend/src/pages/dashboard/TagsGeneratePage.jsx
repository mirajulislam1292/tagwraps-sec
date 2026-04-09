import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { PageHeader } from '../../components/layout/PageHeader'
import { Toolbar } from '../../components/layout/Toolbar'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Cpu, Download, Sparkles } from 'lucide-react'

export function TagsGeneratePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="NFC"
        title="Generate Tags"
        subtitle="Create a cryptographically signed batch and export a CSV for NFC writing."
        right={<Badge variant="warning">Wizard v1</Badge>}
      />

      <Toolbar
        actions={
          <>
            <Button variant="secondary">
              Download template <Download size={16} />
            </Button>
            <Button>
              Start generation <Sparkles size={16} />
            </Button>
          </>
        }
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Generation wizard</CardTitle>
            <div className="h-9 w-9 rounded-2xl border border-border bg-white grid place-items-center text-primary">
              <Cpu size={18} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {[
              { n: '1', t: 'Pick product', d: 'Select a product and quantity for this batch.' },
              { n: '2', t: 'Generate signatures', d: 'Server signs payloads using ECDSA P‑256.' },
              { n: '3', t: 'Export CSV', d: 'Write UID + signature to NFC chips, then lock tags.' },
            ].map((x) => (
              <div key={x.n} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-primary text-white grid place-items-center font-black">
                    {x.n}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">{x.t}</div>
                    <div className="mt-1 text-sm text-text-secondary">{x.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

