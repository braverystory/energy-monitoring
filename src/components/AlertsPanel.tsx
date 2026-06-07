'use client'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  zone?: string
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Energy Consumption',
    message: 'Radiology department exceeding normal consumption by 15%',
    timestamp: '2 minutes ago',
    zone: 'Radiology',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Peak Load Approaching',
    message: 'Operating Rooms approaching peak capacity threshold',
    timestamp: '15 minutes ago',
    zone: 'Operating Rooms',
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Scheduled maintenance for backup generators at 2:00 AM',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Unusual Pattern Detected',
    message: 'Emergency Department showing irregular consumption pattern',
    timestamp: '2 hours ago',
    zone: 'Emergency Department',
  },
]

export default function AlertsPanel() {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return '🚨'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
    }
  }

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getAlertBadge = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
          <p className="text-sm text-gray-500 mt-1">System notifications and warnings</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getAlertIcon(alert.type)}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${getAlertBadge(
                      alert.type
                    )}`}
                  >
                    {alert.type.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>🕐 {alert.timestamp}</span>
                  {alert.zone && <span>📍 {alert.zone}</span>}
                </div>
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
