'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dailyData = [
  { day: 'Mon', consumption: 2458, cost: 342, efficiency: 87 },
  { day: 'Tue', consumption: 2312, cost: 322, efficiency: 89 },
  { day: 'Wed', consumption: 2567, cost: 357, efficiency: 85 },
  { day: 'Thu', consumption: 2401, cost: 334, efficiency: 88 },
  { day: 'Fri', consumption: 2534, cost: 353, efficiency: 86 },
  { day: 'Sat', consumption: 2198, cost: 306, efficiency: 91 },
  { day: 'Sun', consumption: 2076, cost: 289, efficiency: 92 },
]

const zoneDistribution = [
  { name: 'Emergency Dept', value: 145, percentage: 18 },
  { name: 'Operating Rooms', value: 178, percentage: 22 },
  { name: 'ICU', value: 132, percentage: 16 },
  { name: 'General Wards', value: 98, percentage: 12 },
  { name: 'Radiology', value: 165, percentage: 20 },
  { name: 'Laboratory', value: 87, percentage: 11 },
]

const monthlyTrend = [
  { month: 'Jan', consumption: 68450, cost: 9530, target: 70000 },
  { month: 'Feb', consumption: 64230, cost: 8950, target: 70000 },
  { month: 'Mar', consumption: 71240, cost: 9920, target: 70000 },
  { month: 'Apr', consumption: 69870, cost: 9730, target: 70000 },
  { month: 'May', consumption: 73520, cost: 10240, target: 70000 },
  { month: 'Jun', consumption: 45120, cost: 6280, target: 70000 },
]

const peakHours = [
  { hour: '00:00', load: 245 },
  { hour: '02:00', load: 198 },
  { hour: '04:00', load: 187 },
  { hour: '06:00', load: 267 },
  { hour: '08:00', load: 345 },
  { hour: '10:00', load: 398 },
  { hour: '12:00', load: 423 },
  { hour: '14:00', load: 412 },
  { hour: '16:00', load: 434 },
  { hour: '18:00', load: 456 },
  { hour: '20:00', load: 378 },
  { hour: '22:00', load: 312 },
]

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Historical data analysis and insights</p>
          </div>
          
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPeriod === period
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Daily Consumption</p>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">2,364</p>
          <p className="text-sm text-gray-500 mt-1">kWh/day</p>
          <div className="mt-3 flex items-center">
            <span className="text-xs text-green-600 font-medium">↓ 3.2%</span>
            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Cost</p>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">$2,303</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
          <div className="mt-3 flex items-center">
            <span className="text-xs text-green-600 font-medium">↓ 2.8%</span>
            <span className="text-xs text-gray-500 ml-1">vs last week</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Peak Demand</p>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">456</p>
          <p className="text-sm text-gray-500 mt-1">kW</p>
          <div className="mt-3 flex items-center">
            <span className="text-xs text-red-600 font-medium">↑ 1.5%</span>
            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Efficiency Score</p>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">88%</p>
          <p className="text-sm text-gray-500 mt-1">Average</p>
          <div className="mt-3 flex items-center">
            <span className="text-xs text-green-600 font-medium">↑ 2.1%</span>
            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Consumption */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#0ea5e9" name="Consumption (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Zone Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Energy Distribution by Zone</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={zoneDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {zoneDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Consumption Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#0ea5e9" strokeWidth={2} name="Actual (kWh)" />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target (kWh)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Peak Load Hours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="load" fill="#f59e0b" name="Load (kW)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyData.map((day) => (
                <tr key={day.day} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.consumption.toLocaleString()} kWh</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${day.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.efficiency}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      day.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                      day.efficiency >= 85 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {day.efficiency >= 90 ? 'Excellent' : day.efficiency >= 85 ? 'Good' : 'Fair'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
