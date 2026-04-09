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
    primary: 'bg-[#0F4FE8] text-white hover:bg-[#0A38B0] focus:outline-none focus:ring-2 focus:ring-[#0F4FE8]/30',
    secondary: 'bg-white border border-[#0F4FE8]/20 text-[#0F4FE8] hover:bg-[#0F4FE8]/10 focus:outline-none focus:ring-2 focus:ring-[#0F4FE8]/20',
    ghost: 'bg-transparent text-[#0F4FE8] hover:bg-[#0F4FE8]/10 focus:outline-none focus:ring-2 focus:ring-[#0F4FE8]/20',
    danger: 'bg-[#DC2626] text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30',
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

