import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Activity,
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Zap,
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { Button } from '../ui/button'
import { Navbar } from './Navbar'
import { api } from '../../services/api'
import { useAuth } from '../../store/auth'
import { toast } from 'sonner'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/products', label: 'My Products', icon: Box },
  { to: '/generate', label: 'Tag Generator', icon: Zap },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
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
      <Navbar />
      <div className="pt-16"> {/* Account for fixed navbar */}
        <div className="mx-auto max-w-7xl">
          <div className={`grid gap-6 p-4 lg:p-6 transition-all duration-200 ${
            isSidebarCollapsed ? 'lg:grid-cols-[64px_1fr]' : 'lg:grid-cols-[260px_1fr]'
          }`}>
            <aside className={`rounded-xl bg-surface border border-border shadow-card lg:sticky lg:top-22 h-fit overflow-hidden transition-all duration-200 ${
              isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
            }`}>
              <div className="p-4 border-b border-border">
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                  {!isSidebarCollapsed && <BrandMark />}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-1"
                  >
                    {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <nav className="p-3">
                <div className="space-y-1">
                  {nav.map((n) => {
                    const Icon = n.icon
                    return (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        end={n.end}
                        className={({ isActive }) =>
                          [
                            'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                            isActive
                              ? 'bg-primary/10 text-primary border-l-3 border-primary'
                              : 'text-text-primary hover:bg-primary/5',
                            isSidebarCollapsed ? 'justify-center px-2' : '',
                          ].join(' ')
                        }
                      >
                        <Icon size={18} />
                        {!isSidebarCollapsed && <div className="flex-1">{n.label}</div>}
                      </NavLink>
                    )
                  })}
                </div>
              </nav>
              <div className="p-3 border-t border-border">
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-text-primary truncate">John Doe</div>
                      <div className="text-xs text-text-secondary">Pro</div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            <main className="min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

