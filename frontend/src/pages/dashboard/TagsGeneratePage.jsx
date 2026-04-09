import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function TagsGeneratePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Generate Tags</h1>
        <p className="text-sm text-text-secondary">
          Multi-step generation with real-time progress and CSV download.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generation wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">
            This wizard will call the backend ECDSA signing pipeline and create `nfc_tags` rows.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

