import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Factory,
  Cpu,
  ShieldAlert,
  CreditCard,
  Settings2,
} from 'lucide-react'
import { BrandMark } from './BrandMark'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/manufacturers', label: 'Manufacturers', icon: Factory },
  { to: '/admin/tags', label: 'Tags', icon: Cpu },
  { to: '/admin/fraud', label: 'Fraud', icon: ShieldAlert },
  { to: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/admin/system', label: 'System', icon: Settings2 },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0B0C12] text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 p-4 lg:p-6">
          <aside className="rounded-xl bg-[#0F111A] border border-white/10 shadow-card lg:sticky lg:top-6 h-fit">
            <div className="p-5 border-b border-white/10">
              <BrandMark variant="dark" />
            </div>
            <nav className="p-3">
              <div className="space-y-1">
                {nav.map((n) => {
                  const Icon = n.icon
                  return (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                          isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5',
                        ].join(' ')
                      }
                    >
                      <Icon size={18} />
                      {n.label}
                    </NavLink>
                  )
                })}
              </div>
            </nav>
          </aside>
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

