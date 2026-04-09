import { Link } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-border px-3 py-1 text-sm text-text-secondary">
              TagWraps Sec for manufacturers
            </div>
            <div>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight leading-tight">
                A simpler way to authenticate physical products.
              </h1>
              <p className="mt-4 max-w-xl text-base text-text-secondary leading-8">
                Manage product identity, generate NFC tags, and verify every scan from a calm, secure dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="w-full sm:w-auto">Create account</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="w-full sm:w-auto">Sign in</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-text-secondary">Dashboard preview</p>
                <h2 className="mt-2 text-lg font-semibold text-text-primary">Live product management</h2>
              </div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary">TW</div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-white p-4 text-sm text-text-primary">
                <div className="font-semibold">Premium watch</div>
                <div className="text-xs text-text-secondary mt-1">SKU • TW-0401</div>
              </div>
              <div className="rounded-3xl border border-border bg-white p-4 text-sm text-text-primary">
                <div className="font-semibold">Smart charger</div>
                <div className="text-xs text-text-secondary mt-1">SKU • TW-0467</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 space-y-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold text-text-primary">Three clear steps to trusted products.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Feature title="Register products" description="Keep a clean record for every SKU, batch, and manufacturing detail." />
            <Feature title="Generate NFC tags" description="Create signed NFC identities and prepare them for physical tagging." />
            <Feature title="Verify scans" description="Use the public verification flow to confirm authenticity in the field." />
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Why it matters</p>
            <h2 className="text-3xl font-semibold text-text-primary">A reliable control layer for physical products.</h2>
            <p className="max-w-xl text-base text-text-secondary leading-8">
              TagWraps Sec is built for manufacturers who need a clean, secure way to authenticate items without clutter or noise.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Stat title="Built for trust" description="Authentication with real cryptographic records." />
              <Stat title="Designed for clarity" description="A calm interface focused on your workflow." />
            </div>
          </div>
          <div className="rounded-[24px] border border-border bg-surface p-6 shadow-card">
            <div className="rounded-3xl border border-border bg-white p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-text-secondary">Product preview</p>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Product list</h3>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-primary">Premium watch • TW-0401</div>
                <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-primary">Smart charger • TW-0467</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[24px] border border-border bg-surface p-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Ready to start</p>
          <h2 className="mt-4 text-3xl font-semibold text-text-primary">Bring secure product authentication into one place.</h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register">
              <Button className="w-full sm:w-auto">Create account</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="w-full sm:w-auto">Sign in</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function Feature({ title, description }) {
  return (
    <div className="rounded-[24px] border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-3 text-sm text-text-secondary leading-7">{description}</p>
    </div>
  )
}

function Stat({ title, description }) {
  return (
    <div className="rounded-[24px] border border-border bg-white p-5 text-left">
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm text-text-secondary leading-7">{description}</p>
    </div>
  )
}


