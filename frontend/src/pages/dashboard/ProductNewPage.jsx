import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function ProductNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="text-sm text-text-secondary">
          Upload an image to Cloudinary and register product metadata.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New product form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">
            Form wiring (React Hook Form + Zod + Cloudinary upload) is next.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

