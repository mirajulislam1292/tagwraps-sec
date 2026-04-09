import clsx from 'clsx'

export function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        'h-10 w-full rounded-md border border-border bg-white px-3 text-sm outline-none',
        'focus:ring-2 focus:ring-primary/25 focus:border-primary',
        className
      )}
      {...props}
    />
  )
}

