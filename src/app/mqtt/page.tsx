'use client'

import { useState, useEffect } from 'react'

interface MQTTStatus {
  connected: boolean
  broker: string
}

export default function MQTTPage() {
  const [status, setStatus] = useState<MQTTStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/mqtt/status')
      const result = await response.json()
      if (result.success && result.data) {
        setStatus(result.data)
      }
    } catch (error) {
      console.error('Error fetching MQTT status:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const response = await fetch('/api/mqtt/connect', {
        method: 'POST',
      })
      const result = await response.json()
      if (result.success) {
        setTimeout(fetchStatus, 2000)
      }
    } catch (error) {
      console.error('Error connecting MQTT:', error)
    } finally {
      setConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      const response = await fetch('/api/mqtt/connect', {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.success) {
        setTimeout(fetchStatus, 1000)
      }
    } catch (error) {
      console.error('Error disconnecting MQTT:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">MQTT Connection</h1>
        <p className="text-gray-600 mt-2">
          Real-time data from energy monitoring devices
        </p>
      </div>

      <div className="grid gap-6">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status?.connected
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {status?.connected ? '🟢 Connected' : '🔴 Disconnected'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Broker:</span>
              <span className="text-gray-900 font-mono text-sm">
                {status?.broker || 'mqtt://139.59.248.103:1883'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleConnect}
              disabled={status?.connected || connecting}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {connecting ? 'Connecting...' : 'Connect'}
            </button>
            <button
              onClick={handleDisconnect}
              disabled={!status?.connected}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Data Format Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Expected Data Format</h2>
          
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
{`{
  "voltage": 227.0808,
  "current": 0.143,
  "active_power": 28.5415,
  "apparent_power": 32.47249,
  "reactive_power": -2.801904,
  "power_factor": 0.887688,
  "total_energy": 0.029,
  "ID": "1e2daecd"
}`}
            </pre>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Note:</strong> MQTT messages matching this format will be automatically:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Stored in the database as energy readings</li>
              <li>Associated with devices based on ID</li>
              <li>Displayed in real-time on the dashboard</li>
              <li>Used for analytics and reporting</li>
            </ul>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📡 How It Works
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Connect" to start receiving MQTT messages</li>
            <li>The system subscribes to all topics from the broker</li>
            <li>Incoming messages are automatically parsed and stored</li>
            <li>New devices are created automatically if not found</li>
            <li>Energy readings are associated with their respective zones</li>
            <li>Dashboard updates in real-time with the latest data</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
