import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Activity,
  Box,
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
          <aside className="rounded-xl bg-surface border border-border shadow-card lg:sticky lg:top-6 h-fit">
            <div className="p-5 border-b border-border">
              <BrandMark />
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
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                            isActive
                              ? 'bg-primary text-white'
                              : 'text-text-primary hover:bg-black/5',
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
            <div className="p-3 border-t border-border">
              <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </aside>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

