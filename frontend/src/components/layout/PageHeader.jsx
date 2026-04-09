import { Badge } from '../ui/badge'

export function PageHeader({ eyebrow, title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <div className="mb-2">
            <Badge variant="primary">{eyebrow}</Badge>
          </div>
        ) : null}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary">
          {title}
        </h1>
        {subtitle ? <p className="mt-2 text-sm text-text-secondary">{subtitle}</p> : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  )
}

