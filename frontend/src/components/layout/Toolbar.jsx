import { Input } from '../ui/input'
import { Button } from '../ui/button'

export function Toolbar({ search, onSearch, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex-1 max-w-xl">
        {onSearch ? (
          <Input
            value={search || ''}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search…"
          />
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  )
}

