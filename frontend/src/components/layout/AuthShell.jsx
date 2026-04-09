import { BrandMark } from './BrandMark'

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#0A1A3D] text-white p-12">
        <div>
          <BrandMark variant="dark" />
          <h1 className="mt-16 text-5xl font-heading font-bold tracking-tight text-white">
            Simply Authentic.
          </h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-md">
            {subtitle}
          </p>
          {/* Abstract animation placeholder - floating shield icons and hexagon grid */}
          <div className="mt-12 relative">
            <div className="grid grid-cols-3 gap-4 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-12 h-12 border border-white/20 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-primary/30 rounded-full animate-spin" />
            </div>
          </div>
        </div>
        {/* Testimonial */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <p className="text-sm text-white/90 italic">
            "TagWraps Sec transformed our product authentication. Our customers now trust our supply chain like never before."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium">Jane Doe</div>
              <div className="text-xs text-white/70">CEO, TechCorp</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <BrandMark />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

