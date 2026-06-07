'use client'

import { useState, useEffect } from 'react'

interface EnergyCard {
  title: string
  value: string
  unit: string
  change: number
  icon: string
  color: string
}

export default function EnergyOverview() {
  const [energyData, setEnergyData] = useState<EnergyCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/energy/stats')
        const result = await response.json()
        
        if (result.success && result.data) {
          const data = result.data
          setEnergyData([
            {
              title: 'Total Consumption',
              value: data.totalConsumption.toString(),
              unit: 'kWh',
              change: data.change.consumption,
              icon: '⚡',
              color: 'bg-blue-500',
            },
            {
              title: 'Current Load',
              value: data.currentLoad.toString(),
              unit: 'kW',
              change: data.change.load,
              icon: '🔌',
              color: 'bg-green-500',
            },
            {
              title: 'Peak Demand',
              value: data.peakDemand.toString(),
              unit: 'kW',
              change: data.change.peak,
              icon: '📊',
              color: 'bg-orange-500',
            },
            {
              title: 'Cost Today',
              value: `$${data.costToday}`,
              unit: 'USD',
              change: data.change.cost,
              icon: '💰',
              color: 'bg-purple-500',
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching energy stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {energyData.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-500">{item.unit}</p>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`text-xs font-medium ${
                    item.change < 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            </div>
            <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
