export function Spinner({ label }) {
  return (
    <div className="flex items-center gap-3 text-text-secondary">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  )
}

