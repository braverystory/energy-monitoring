'use client'

import { useState, useEffect } from 'react'

interface Zone {
  id: string
  name: string
  consumption: number
  capacity: number
  status: 'normal' | 'warning' | 'critical'
}

export default function ZoneMonitoring() {
  const [zones, setZones] = useState<Zone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('/api/zones')
        const result = await response.json()
        
        if (result.success && result.data) {
          setZones(result.data)
        }
      } catch (error) {
        console.error('Error fetching zones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchZones()
    const interval = setInterval(fetchZones, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

'use client'

import { useState, useEffect } from 'react'

interface Zone {
  id: string
  name: string
  consumption: number
  capacity: number
  status: 'normal' | 'warning' | 'critical'
}

export default function ZoneMonitoring() {
  const [zones, setZones] = useState<Zone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch('/api/zones')
        const result = await response.json()
        
        if (result.success && result.data) {
          setZones(result.data)
        }
      } catch (error) {
        console.error('Error fetching zones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchZones()
    const interval = setInterval(fetchZones, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'critical':
        return 'bg-red-500'
    }
  }

  const getStatusBadge = (status: Zone['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Zone Monitoring</h2>
          <p className="text-sm text-gray-500 mt-1">Energy consumption by hospital department</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((zone) => {
          const percentage = (zone.consumption / zone.capacity) * 100

          return (
            <div
              key={zone.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                    zone.status
                  )}`}
                >
                  {zone.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consumption</span>
                  <span className="font-medium text-gray-900">
                    {zone.consumption} / {zone.capacity} kW
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getStatusColor(
                      zone.status
                    )}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(1)}% utilized</span>
                  <span>{zone.capacity - zone.consumption} kW available</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

    switch (status) {
      case 'normal':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'critical':
        return 'bg-red-500'
    }
  }

  const getStatusBadge = (status: Zone['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Zone Monitoring</h2>
          <p className="text-sm text-gray-500 mt-1">Energy consumption by hospital department</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((zone) => {
          const percentage = (zone.consumption / zone.capacity) * 100

          return (
            <div
              key={zone.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                    zone.status
                  )}`}
                >
                  {zone.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Consumption</span>
                  <span className="font-medium text-gray-900">
                    {zone.consumption} / {zone.capacity} kW
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getStatusColor(
                      zone.status
                    )}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(1)}% utilized</span>
                  <span>{zone.capacity - zone.consumption} kW available</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
