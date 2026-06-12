'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Real-time Monitor', href: '/monitor', icon: '⚡' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Zones', href: '/zones', icon: '🏥' },
  { name: 'Alerts', href: '/alerts', icon: '🔔' },
  { name: 'Reports', href: '/reports', icon: '📄' },
  { name: 'MQTT Connection', href: '/mqtt', icon: '🔌' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <div className="text-3xl">⚡</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Energy Monitor</h1>
            <p className="text-xs text-gray-500">Hospital System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t px-3 py-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@hospital.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
