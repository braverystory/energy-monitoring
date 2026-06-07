'use client'

import { useState } from 'react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  zone?: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Energy Consumption',
    message: 'Radiology department exceeding normal consumption by 15%. Immediate attention required.',
    timestamp: new Date(Date.now() - 2 * 60000),
    zone: 'Radiology',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Peak Load Approaching',
    message: 'Operating Rooms approaching peak capacity threshold (81% utilization).',
    timestamp: new Date(Date.now() - 15 * 60000),
    zone: 'Operating Rooms',
    acknowledged: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Scheduled maintenance for backup generators at 2:00 AM tomorrow.',
    timestamp: new Date(Date.now() - 60 * 60000),
    acknowledged: true,
    acknowledgedBy: 'admin@hospital.com',
    acknowledgedAt: new Date(Date.now() - 50 * 60000),
  },
  {
    id: '4',
    type: 'warning',
    title: 'Unusual Pattern Detected',
    message: 'Emergency Department showing irregular consumption pattern in the last hour.',
    timestamp: new Date(Date.now() - 120 * 60000),
    zone: 'Emergency Department',
    acknowledged: false,
  },
  {
    id: '5',
    type: 'critical',
    title: 'System Overload Warning',
    message: 'Total hospital load reaching 92% of maximum capacity.',
    timestamp: new Date(Date.now() - 180 * 60000),
    acknowledged: false,
  },
  {
    id: '6',
    type: 'info',
    title: 'Energy Report Generated',
    message: 'Weekly energy consumption report has been generated and is ready for review.',
    timestamp: new Date(Date.now() - 240 * 60000),
    acknowledged: true,
    acknowledgedBy: 'operator@hospital.com',
    acknowledgedAt: new Date(Date.now() - 220 * 60000),
  },
  {
    id: '7',
    type: 'warning',
    title: 'Temperature Anomaly',
    message: 'ICU HVAC system showing temperature fluctuations outside normal range.',
    timestamp: new Date(Date.now() - 300 * 60000),
    zone: 'ICU',
    acknowledged: false,
  },
  {
    id: '8',
    type: 'info',
    title: 'Device Status Update',
    message: 'MRI machine in Radiology has completed diagnostics and returned to operational status.',
    timestamp: new Date(Date.now() - 360 * 60000),
    zone: 'Radiology',
    acknowledged: true,
    acknowledgedBy: 'tech@hospital.com',
    acknowledgedAt: new Date(Date.now() - 350 * 60000),
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'unacknowledged'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return '🚨'
      case 'warning': return '⚠️'
      case 'info': return 'ℹ️'
    }
  }

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'info': return 'bg-blue-50 border-blue-200'
    }
  }

  const getAlertBadge = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'info': return 'bg-blue-100 text-blue-800'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    return date.toLocaleString()
  }

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? {
            ...alert,
            acknowledged: true,
            acknowledgedBy: 'admin@hospital.com',
            acknowledgedAt: new Date(),
          }
        : alert
    ))
  }

  const filteredAlerts = alerts.filter(alert => {
    // Filter by type
    if (filter === 'critical' && alert.type !== 'critical') return false
    if (filter === 'warning' && alert.type !== 'warning') return false
    if (filter === 'info' && alert.type !== 'info') return false
    if (filter === 'unacknowledged' && alert.acknowledged) return false

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        alert.title.toLowerCase().includes(search) ||
        alert.message.toLowerCase().includes(search) ||
        alert.zone?.toLowerCase().includes(search)
      )
    }

    return true
  })

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.type === 'critical' && !a.acknowledged).length,
    warning: alerts.filter(a => a.type === 'warning' && !a.acknowledged).length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alert Management</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor and manage system alerts and notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Critical</p>
              <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <div className="text-4xl">🚨</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Warnings</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.warning}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unacknowledged</p>
              <p className="text-3xl font-bold text-blue-600">{stats.unacknowledged}</p>
            </div>
            <div className="text-4xl">📬</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'critical', 'warning', 'info', 'unacknowledged'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500">All systems are operating normally</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-6 transition-all ${getAlertColor(alert.type)} ${
                alert.acknowledged ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{getAlertIcon(alert.type)}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-lg">{alert.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getAlertBadge(alert.type)}`}>
                        {alert.type.toUpperCase()}
                      </span>
                      {alert.acknowledged && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          ACKNOWLEDGED
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      🕐 {formatTimestamp(alert.timestamp)}
                    </span>
                    {alert.zone && (
                      <span className="flex items-center gap-1">
                        📍 {alert.zone}
                      </span>
                    )}
                    {alert.acknowledged && alert.acknowledgedBy && (
                      <span className="flex items-center gap-1">
                        ✅ Acknowledged by {alert.acknowledgedBy}
                      </span>
                    )}
                  </div>

                  {!alert.acknowledged && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                      >
                        Acknowledge
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  )}
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredAlerts.length > 0 && (
        <div className="mt-6 flex items-center justify-between bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
