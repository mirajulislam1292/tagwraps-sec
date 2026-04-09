export function BrandMark({ variant = 'light' }) {
  const color = variant === 'dark' ? 'text-white' : 'text-text-primary'
  const mark = variant === 'dark' ? '/tagwraps-logo-light.png' : '/tagwraps-logo-dark.png'
  return (
    <div className={`flex items-center gap-3 ${color}`}>
      <img
        src={mark}
        width="36"
        height="36"
        alt="TagWraps"
        className="h-9 w-9 object-contain"
        loading="eager"
      />
      <div className="leading-tight">
        <div className="font-bold">TagWraps Sec</div>
        <div className={variant === 'dark' ? 'text-xs text-white/80' : 'text-xs text-text-secondary'}>
          Simply Authentic.
        </div>
      </div>
    </div>
  )
}

