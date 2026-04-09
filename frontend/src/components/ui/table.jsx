import clsx from 'clsx'

export function Table({ className, ...props }) {
  return (
    <div className={clsx('w-full overflow-x-auto rounded-xl border border-border bg-white', className)}>
      <table className="w-full text-sm" {...props} />
    </div>
  )
}

export function THead({ className, ...props }) {
  return <thead className={clsx('bg-background text-text-secondary', className)} {...props} />
}

export function TH({ className, ...props }) {
  return (
    <th
      className={clsx('px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide', className)}
      {...props}
    />
  )
}

export function TBody({ className, ...props }) {
  return <tbody className={clsx('divide-y divide-border', className)} {...props} />
}

export function TR({ className, ...props }) {
  return <tr className={clsx('hover:bg-black/[0.02] transition', className)} {...props} />
}

export function TD({ className, ...props }) {
  return <td className={clsx('px-4 py-3 align-middle', className)} {...props} />
}

