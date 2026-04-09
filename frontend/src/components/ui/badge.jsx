import clsx from 'clsx'

export function Badge({ variant = 'default', className, ...props }) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold'
  const variants = {
    default: 'bg-black/5 text-text-primary',
    primary: 'bg-primary/10 text-primary border border-primary/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    danger: 'bg-danger/10 text-danger border border-danger/20',
  }
  return <span className={clsx(base, variants[variant], className)} {...props} />
}

