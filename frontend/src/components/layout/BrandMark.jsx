export function BrandMark({ variant = 'light' }) {
  const color = variant === 'dark' ? 'text-white' : 'text-text-primary'
  return (
    <div className={`flex items-center gap-3 ${color}`}>
      <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center text-white font-black">
        T
      </div>
      <div className="leading-tight">
        <div className="font-bold">TagWraps Sec</div>
        <div className="text-xs text-text-secondary">Simply Authentic.</div>
      </div>
    </div>
  )
}

