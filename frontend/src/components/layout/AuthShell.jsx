import { BrandMark } from './BrandMark'

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-white">
      <div className="mx-auto max-w-6xl min-h-screen grid lg:grid-cols-2 gap-8 items-stretch p-4 lg:p-8">
        <div className="hidden lg:flex flex-col justify-between rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-primary-dark text-white shadow-card p-8">
          <div>
            <BrandMark variant="dark" />
            <h1 className="mt-10 text-4xl font-black tracking-tight text-white">
              {title}
            </h1>
            <p className="mt-4 text-white/85 leading-relaxed">{subtitle}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="text-2xl font-black">ECDSA</div>
                <div className="text-sm text-white/80">P-256 signatures</div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="text-2xl font-black">NFC</div>
                <div className="text-sm text-white/80">Tap-to-verify</div>
              </div>
            </div>
          </div>
          <div className="text-sm text-white/80">
            Learn about TagWraps:{' '}
            <a
              className="text-white underline underline-offset-4"
              href="https://tagwraps.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              tagwraps.vercel.app
            </a>
          </div>
        </div>

        <div className="flex items-start justify-center py-6 lg:py-0">
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

