import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Activity,
  Box,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldAlert,
  Users,
  Cpu,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { Button } from '../ui/button'
import { api } from '../../services/api'
import { useAuth } from '../../store/auth'
import { toast } from 'sonner'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/products', label: 'Products', icon: Box },
  { to: '/dashboard/tags', label: 'NFC Tags', icon: Cpu },
  { to: '/dashboard/scan-logs', label: 'Scan Logs', icon: Activity },
  { to: '/dashboard/fraud-alerts', label: 'Fraud Alerts', icon: ShieldAlert },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/dashboard/team', label: 'Team', icon: Users, hidden: true },
]

export function DashboardLayout() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  async function onLogout() {
    try {
      await api.post('/api/v1/auth/logout')
      setUser(null)
      navigate('/login', { replace: true })
    } catch (e) {
      toast.error('Logout failed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 p-4 lg:p-6">
          <aside className="rounded-2xl bg-surface border border-border shadow-card lg:sticky lg:top-6 h-fit overflow-hidden">
            <div className="p-5 border-b border-border bg-gradient-to-br from-primary/8 via-white to-white">
              <BrandMark />
              <div className="mt-3 text-xs text-text-secondary">
                Manufacturer console <ChevronRight size={14} className="inline -mt-0.5" /> TagWraps Sec
              </div>
            </div>
            <nav className="p-3">
              <div className="space-y-1">
                {nav
                  .filter((n) => !n.hidden)
                  .map((n) => {
                    const Icon = n.icon
                    return (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        end={n.end}
                        className={({ isActive }) =>
                          [
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                            isActive
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-text-primary hover:bg-black/5',
                          ].join(' ')
                        }
                      >
                        <div className="h-9 w-9 rounded-xl grid place-items-center border border-transparent group-hover:border-border/60 bg-black/0">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">{n.label}</div>
                      </NavLink>
                    )
                  })}
              </div>
            </nav>
            <div className="p-3 border-t border-border bg-white">
              <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
              <div className="border-b border-border bg-gradient-to-b from-primary/6 via-white to-white p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-text-secondary">TagWraps Sec</div>
                  <div className="text-sm font-bold text-text-primary truncate">Manufacturer dashboard</div>
                </div>
                <a href="https://tagwraps.vercel.app/" target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm">
                    Info
                  </Button>
                </a>
              </div>
              <div className="p-4 sm:p-6 bg-background">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

