import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { EmptyState } from '../../components/ui/empty-state'
import { Box } from 'lucide-react'

export function ProductsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        subtitle="Register and manage products."
        right={
          <Link to="/dashboard/products/new">
            <Button>Add New Product</Button>
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Product list</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Box size={18} />}
            title="No products yet"
            description="Create your first product, then generate tags and start monitoring scans."
            actionLabel="Add a product"
            onAction={() => (window.location.href = '/dashboard/products/new')}
          />
        </CardContent>
      </Card>
    </div>
  )
}

