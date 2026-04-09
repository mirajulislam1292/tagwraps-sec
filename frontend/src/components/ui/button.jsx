import clsx from 'clsx'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30',
    secondary: 'bg-white border border-border text-text-primary hover:bg-background',
    ghost: 'bg-transparent text-text-primary hover:bg-black/5',
    danger: 'bg-danger text-white hover:brightness-95',
  }
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  }
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

