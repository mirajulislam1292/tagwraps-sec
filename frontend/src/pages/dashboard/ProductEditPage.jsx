import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function ProductEditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit product</h1>
        <p className="text-sm text-text-secondary">Update product metadata and image.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">Coming next.</div>
        </CardContent>
      </Card>
    </div>
  )
}

