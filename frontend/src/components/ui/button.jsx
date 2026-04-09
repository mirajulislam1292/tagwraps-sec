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
    primary: 'bg-[#0047AB] text-white hover:bg-[#003380] focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30',
    secondary: 'bg-white border border-[#0047AB]/20 text-[#0047AB] hover:bg-[#0047AB]/10 focus:outline-none focus:ring-2 focus:ring-[#0047AB]/20',
    ghost: 'bg-transparent text-[#0047AB] hover:bg-[#0047AB]/10 focus:outline-none focus:ring-2 focus:ring-[#0047AB]/20',
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

