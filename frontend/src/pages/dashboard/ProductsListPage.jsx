import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

export function ProductsListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-text-secondary">Register and manage products.</p>
        </div>
        <Link to="/dashboard/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product list</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-secondary">
            Empty state: no products yet. Use “Add New Product” to register your first product.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

