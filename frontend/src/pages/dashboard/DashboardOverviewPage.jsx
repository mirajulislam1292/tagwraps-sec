import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowDown, Bell, Search, Plus, Zap } from 'lucide-react'

export function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">Dashboard</h1>
          <div className="text-sm text-text-secondary">Home / Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/15 w-64"
            />
          </div>
          <button className="relative p-2 text-text-secondary hover:text-text-primary">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Tags Generated', value: '12,847', change: '+12%', changeType: 'positive' },
          { title: 'Active Tags', value: '11,203', change: '+8%', changeType: 'positive' },
          { title: 'Pending Verification', value: '234', change: '-3%', changeType: 'negative' },
          { title: 'Expired Tags', value: '410', change: '+2%', changeType: 'positive' },
        ].map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="text-sm text-text-secondary mb-1">{stat.title}</div>
              <div className="text-3xl font-heading font-bold text-text-primary mb-2">{stat.value}</div>
              <div className={`flex items-center text-sm ${stat.changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
                {stat.changeType === 'positive' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {stat.change} this month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Product Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Tag ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Date Created</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { product: 'Premium Headphones', tagId: 'TW-001-84729', status: 'Active', date: '2024-01-15', statusColor: 'success' },
                      { product: 'Wireless Charger', tagId: 'TW-002-56341', status: 'Pending', date: '2024-01-14', statusColor: 'warning' },
                      { product: 'Smart Watch', tagId: 'TW-003-29483', status: 'Expired', date: '2024-01-13', statusColor: 'text-secondary' },
                      { product: 'Bluetooth Speaker', tagId: 'TW-004-71829', status: 'Active', date: '2024-01-12', statusColor: 'success' },
                      { product: 'Gaming Mouse', tagId: 'TW-005-46291', status: 'Revoked', date: '2024-01-11', statusColor: 'danger' },
                    ].map((row, index) => (
                      <tr key={index} className={`border-b border-border hover:bg-primary/5 ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}`}>
                        <td className="py-3 px-4 text-sm text-text-primary">{row.product}</td>
                        <td className="py-3 px-4 text-sm font-mono text-text-secondary">{row.tagId}</td>
                        <td className="py-3 px-4">
                          <Badge variant={row.statusColor === 'success' ? 'default' : row.statusColor === 'warning' ? 'secondary' : 'outline'}>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{row.date}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/generate">
                <Button className="w-full h-12 shadow-elevated">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate New Tags
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" className="w-full h-12">
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Product
                </Button>
              </Link>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-text-primary mb-3">Recent Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">Counterfeit detected</div>
                      <div className="text-xs text-text-secondary">Tag TW-001-84729 scanned 3 times</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">Batch generated</div>
                      <div className="text-xs text-text-secondary">500 tags created successfully</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

