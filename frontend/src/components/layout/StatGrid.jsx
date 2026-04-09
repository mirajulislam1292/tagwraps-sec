import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function StatGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((x) => (
        <Card key={x.title} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm">{x.title}</CardTitle>
              <div className="h-9 w-9 rounded-2xl border border-border bg-white grid place-items-center">
                {x.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tight">{x.value}</div>
            {x.hint ? <p className="text-xs text-text-secondary mt-1">{x.hint}</p> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

