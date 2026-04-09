import { BrandMark } from './BrandMark'

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <BrandMark />
        </div>
        <div className="rounded-[20px] border border-border bg-white shadow-card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary">{title}</h1>
            <p className="mt-3 text-sm text-text-secondary">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

