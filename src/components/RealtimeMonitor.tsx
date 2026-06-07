'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DataPoint {
  time: string
  consumption: number
  target: number
}

export default function RealtimeMonitor() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // Initialize with some data
    const initialData: DataPoint[] = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5 * 60000) // 5 minutes intervals
      initialData.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        consumption: 280 + Math.random() * 80,
        target: 320,
      })
    }
    setData(initialData)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          consumption: 280 + Math.random() * 80,
          target: 320,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Real-time Energy Consumption</h2>
          <p className="text-sm text-gray-500 mt-1">Live monitoring - Updates every 5 seconds</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            1H
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg">
            12H
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            24H
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="consumption" 
            stroke="#0ea5e9" 
            strokeWidth={2}
            name="Current Consumption"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#ef4444" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Target Limit"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
