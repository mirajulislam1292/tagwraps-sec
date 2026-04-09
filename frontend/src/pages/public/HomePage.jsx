import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/layout/BrandMark'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { ShieldCheck, Smartphone, KeyRound, Activity, ArrowRight } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 backdrop-blur bg-background/70 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <BrandMark />
          <div className="flex items-center gap-2">
            <a
              className="hidden sm:inline text-sm text-text-secondary hover:text-text-primary"
              href="https://tagwraps.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              TagWraps (company site)
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
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-primary">TagWraps Sec</p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 text-text-primary">
                Every fake product is a betrayal of trust.
                <br className="hidden sm:block" />
                We’re ending that.
              </h1>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                TagWraps Sec is the operating platform for TagWraps — the backend system manufacturers
                use to register products, generate cryptographic NFC identities, monitor scans, and
                respond to fraud alerts in real time.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <Button className="w-full sm:w-auto">
                    Create manufacturer account <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Sign in
                  </Button>
                </Link>
              </div>
              <div className="mt-6 text-xs text-text-secondary">
                Want the full story? Visit the TagWraps info page:{' '}
                <a
                  href="https://tagwraps.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  tagwraps.vercel.app
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-white to-white border border-border shadow-card p-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-none">
                  <CardContent className="p-4">
                    <ShieldCheck className="text-success" />
                    <div className="mt-2 font-bold">ECDSA verified</div>
                    <div className="text-sm text-text-secondary">
                      P-256 signatures validate authenticity server-side.
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="p-4">
                    <KeyRound className="text-primary" />
                    <div className="mt-2 font-bold">Secure sessions</div>
                    <div className="text-sm text-text-secondary">
                      Access + refresh tokens in httpOnly cookies.
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="p-4">
                    <Smartphone className="text-warning" />
                    <div className="mt-2 font-bold">3-second checks</div>
                    <div className="text-sm text-text-secondary">
                      Public verification endpoint for customer scans.
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="p-4">
                    <Activity className="text-danger" />
                    <div className="mt-2 font-bold">Fraud alerts</div>
                    <div className="text-sm text-text-secondary">
                      Duplicate scans and invalid signatures trigger alerts.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="rounded-2xl bg-surface border border-border shadow-card p-6 sm:p-8">
            <h2 className="text-xl font-black">How it works</h2>
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              <Step
                n="1"
                title="Register products"
                body="Manufacturers register product metadata and images in TagWraps Sec."
              />
              <Step
                n="2"
                title="Generate NFC tag identities"
                body="We generate unique tag UIDs, sign payloads with ECDSA, and store them securely."
              />
              <Step
                n="3"
                title="Verify + monitor scans"
                body="Customer scans call the verify API. We log scans and raise fraud alerts if suspicious."
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
    <div className="rounded-xl border border-border bg-background p-4">
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

