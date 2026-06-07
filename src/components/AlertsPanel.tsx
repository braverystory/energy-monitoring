'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  zone?: string
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts?acknowledged=false')
        const result = await response.json()
        
        if (result.success && result.data) {
          // Convert timestamp strings to Date objects and limit to 4 most recent
          const formattedAlerts = result.data
            .map((alert: any) => ({
              ...alert,
              timestamp: new Date(alert.timestamp),
            }))
            .slice(0, 4)
          setAlerts(formattedAlerts)
        }
      } catch (error) {
        console.error('Error fetching alerts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
    const interval = setInterval(fetchAlerts, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

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
                  <span>🕐 {formatDistanceToNow(alert.timestamp, { addSuffix: true })}</span>
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
