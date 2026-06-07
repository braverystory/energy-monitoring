'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MonitorData {
  time: string
  consumption: number
  voltage: number
  current: number
  powerFactor: number
}

export default function MonitorPage() {
  const [data, setData] = useState<MonitorData[]>([])
  const [selectedMetric, setSelectedMetric] = useState<'consumption' | 'voltage' | 'current' | 'powerFactor'>('consumption')
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '12h' | '24h'>('12h')
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Initialize data
    const initialData: MonitorData[] = []
    const now = new Date()
    const intervals = timeRange === '1h' ? 12 : timeRange === '6h' ? 36 : timeRange === '12h' ? 72 : 144
    const minuteInterval = timeRange === '1h' ? 5 : timeRange === '6h' ? 10 : timeRange === '12h' ? 10 : 10

    for (let i = intervals - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * minuteInterval * 60000)
      initialData.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        consumption: 280 + Math.random() * 80,
        voltage: 220 + Math.random() * 10,
        current: 420 + Math.random() * 50,
        powerFactor: 0.85 + Math.random() * 0.1,
      })
    }
    setData(initialData)

    // Update data in real-time if live mode is enabled
    if (isLive) {
      const interval = setInterval(() => {
        setData((prevData) => {
          const newData = [...prevData.slice(1)]
          const now = new Date()
          newData.push({
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            consumption: 280 + Math.random() * 80,
            voltage: 220 + Math.random() * 10,
            current: 420 + Math.random() * 50,
            powerFactor: 0.85 + Math.random() * 0.1,
          })
          return newData
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [timeRange, isLive])

  const currentData = data.length > 0 ? data[data.length - 1] : null

  const getMetricConfig = (metric: typeof selectedMetric) => {
    switch (metric) {
      case 'consumption':
        return { label: 'Power Consumption', unit: 'kW', color: '#0ea5e9' }
      case 'voltage':
        return { label: 'Voltage', unit: 'V', color: '#10b981' }
      case 'current':
        return { label: 'Current', unit: 'A', color: '#f59e0b' }
      case 'powerFactor':
        return { label: 'Power Factor', unit: '', color: '#8b5cf6' }
    }
  }

  const config = getMetricConfig(selectedMetric)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-time Monitor</h1>
            <p className="text-sm text-gray-500 mt-1">Live energy consumption and electrical parameters</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                isLive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></span>
              {isLive ? 'Live' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Current Readings */}
      {currentData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Power Consumption</p>
            <p className="text-3xl font-bold text-gray-900">{currentData.consumption.toFixed(1)}</p>
            <p className="text-sm text-gray-500">kW</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Voltage</p>
            <p className="text-3xl font-bold text-gray-900">{currentData.voltage.toFixed(1)}</p>
            <p className="text-sm text-gray-500">V</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Current</p>
            <p className="text-3xl font-bold text-gray-900">{currentData.current.toFixed(1)}</p>
            <p className="text-sm text-gray-500">A</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Power Factor</p>
            <p className="text-3xl font-bold text-gray-900">{currentData.powerFactor.toFixed(3)}</p>
            <p className="text-sm text-gray-500">PF</p>
          </div>
        </div>
      )}

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{config.label}</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time monitoring</p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex gap-2 border-r pr-4 mr-2">
              {(['consumption', 'voltage', 'current', 'powerFactor'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1.5 rounded text-sm font-medium ${
                    selectedMetric === metric
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getMetricConfig(metric).label}
                </button>
              ))}
            </div>
            
            {(['1h', '6h', '12h', '24h'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={config.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: config.unit, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey={selectedMetric} 
              stroke={config.color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorMetric)"
              name={config.label}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* All Metrics Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">All Metrics Comparison</h2>
          <p className="text-sm text-gray-500 mt-1">Compare all electrical parameters</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="consumption" stroke="#0ea5e9" name="Consumption (kW)" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="voltage" stroke="#10b981" name="Voltage (V)" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="current" stroke="#f59e0b" name="Current (A)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
