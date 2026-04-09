import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  Activity,
  ArrowRight,
  PlayCircle,
} from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/90 border-b border-primary/10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <BrandMark />
          <div className="flex items-center gap-2">
            <a href="https://tagwraps.vercel.app/" target="_blank" rel="noreferrer">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Info
                <ArrowRight size={16} />
              </Button>
            </a>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button>
                Get started <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-primary/5">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-white to-background" />
            <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-primary/35 blur-3xl" />
            <div className="absolute top-28 -right-24 h-[520px] w-[520px] rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center rounded-[2rem] border border-primary/15 bg-white/95 p-8 shadow-card">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                TagWraps Sec · Manufacturer platform
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
                Secure your supply chain
                <br className="hidden sm:block" />
                with cryptographic NFC tags.
                <span className="text-primary"> Simply Authentic.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed">
                This is the operating platform manufacturers use to register products, generate signed
                NFC identities, monitor scans, and handle fraud alerts in real time.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <Button className="w-full sm:w-auto">
                    Create account <ArrowRight size={16} />
                  </Button>
                </Link>
                <a href="https://tagwraps.vercel.app/" target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    How it works <PlayCircle size={16} />
                  </Button>
                </a>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <Stat k="5%+" v="counterfeit medicines" s="WHO estimate" />
                <Stat k="৳25B+" v="lost annually by brands" s="South Asia" />
                <Stat k="1 in 5" v="consumer products may be fake" s="Bangladesh" />
              </div>

              <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-text-primary">Public customer verification page</div>
                  <div className="text-sm text-text-secondary">
                    Customers tap a tag and open <span className="font-medium">/verify/&lt;tag_uid&gt;</span>.
                  </div>
                </div>
                <Link to="/verify/demo">
                  <Button variant="secondary">Preview verify UI</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-white to-white border border-primary/15 shadow-card p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-text-primary">Authentication layer</div>
                  <div className="text-xs text-text-secondary">Designed for high-trust industries</div>
                </div>
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center">
                  <ShieldCheck className="text-primary" size={18} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <Feature
                  icon={<ShieldCheck className="text-success" />}
                  title="ECDSA verified"
                  body="P-256 signatures validate authenticity server-side."
                />
                <Feature
                  icon={<KeyRound className="text-primary" />}
                  title="Secure sessions"
                  body="Access + refresh tokens stored in httpOnly cookies."
                />
                <Feature
                  icon={<Smartphone className="text-warning" />}
                  title="3-second checks"
                  body="Public verify page for tap-to-verify customer flow."
                />
                <Feature
                  icon={<Activity className="text-danger" />}
                  title="Fraud alerts"
                  body="Duplicate scans and invalid signatures raise alerts."
                />
              </div>

              <div className="mt-5 rounded-xl border border-primary/15 bg-white/70 p-4">
                <div className="text-xs text-text-secondary">Fastest path</div>
                <div className="mt-1 text-sm font-semibold text-text-primary">
                  Tap → Verify → Trust
                </div>
                <div className="mt-2 text-sm text-text-secondary">
                  No app required for customers. NFC opens a link, and TagWraps verifies instantly.
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="rounded-2xl bg-primary/10 border border-primary/15 shadow-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">How TagWraps Sec works</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  TagWraps Sec is the operational platform. The separate info site demonstrates the story and process.
                </p>
              </div>
              <a href="https://tagwraps.vercel.app/" target="_blank" rel="noreferrer">
                <Button variant="secondary">
                  Read the story <ArrowRight size={16} />
                </Button>
              </a>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Step
                n="1"
                title="Register products"
                body="Create product records, images, and batches inside TagWraps Sec."
              />
              <Step
                n="2"
                title="Generate tags"
                body="Generate tag UIDs and ECDSA signatures, then write to physical NFC chips."
              />
              <Step
                n="3"
                title="Monitor scans + alerts"
                body="View scan logs, detect suspicious duplicates, and resolve fraud alerts quickly."
              />
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <BrandMark />
          <div className="text-sm text-text-secondary">
            TagWraps Sec is infrastructure — the authentication layer for physical commerce.
          </div>
        </div>
      </footer>
    </div>
  )
}

function Step({ n, title, body }) {
  return (
    <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-primary text-white grid place-items-center font-black">
          {n}
        </div>
        <div className="font-bold">{title}</div>
      </div>
      <div className="mt-2 text-sm text-text-secondary">{body}</div>
    </div>
  )
}

function Feature({ icon, title, body }) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        {icon}
        <div className="mt-2 font-bold">{title}</div>
        <div className="text-sm text-text-secondary">{body}</div>
      </CardContent>
    </Card>
  )
}

function Stat({ k, v, s }) {
  return (
    <div className="rounded-xl border border-primary/15 bg-white/70 backdrop-blur p-3">
      <div className="text-lg font-black text-text-primary">{k}</div>
      <div className="text-xs text-text-secondary">{v}</div>
      <div className="mt-1 text-[11px] text-text-secondary/80">{s}</div>
    </div>
  )
}

