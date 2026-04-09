import clsx from 'clsx'

export function Card({ className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-xl bg-surface border border-border shadow-card',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={clsx('p-5 pb-3', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h2 className={clsx('text-lg font-bold', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={clsx('p-5 pt-0', className)} {...props} />
}

