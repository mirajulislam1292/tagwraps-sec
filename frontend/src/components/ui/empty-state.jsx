import { Button } from './button'

export function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/15 grid place-items-center text-primary">
            {icon}
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary">{title}</div>
            <div className="mt-1 text-sm text-text-secondary">{description}</div>
          </div>
        </div>
        {actionLabel ? (
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

