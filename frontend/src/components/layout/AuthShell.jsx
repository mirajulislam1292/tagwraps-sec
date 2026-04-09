import { BrandMark } from './BrandMark'

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-white">
      <div className="mx-auto max-w-6xl min-h-screen grid lg:grid-cols-2 gap-8 items-stretch p-4 lg:p-8">
        <div className="hidden lg:flex flex-col justify-between rounded-2xl border border-border bg-white/60 backdrop-blur shadow-card p-8">
          <div>
            <BrandMark />
            <h1 className="mt-8 text-4xl font-black tracking-tight text-text-primary">
              {title}
            </h1>
            <p className="mt-3 text-text-secondary leading-relaxed">{subtitle}</p>
          </div>
          <div className="text-sm text-text-secondary">
            Learn about TagWraps:{' '}
            <a
              className="text-primary hover:underline"
              href="https://tagwraps.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              tagwraps.vercel.app
            </a>
          </div>
        </div>

        <div className="grid place-items-center">
          <div className="w-full max-w-md">
            <div className="mb-6 flex justify-center lg:hidden">
              <BrandMark />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

