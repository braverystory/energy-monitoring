'use client'

import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Zone {
  id: string
  name: string
  description: string
  consumption: number
  capacity: number
  status: 'normal' | 'warning' | 'critical'
  devices: Device[]
  floor: string
  area: string
}

interface Device {
  id: string
  name: string
  type: string
  consumption: number
  status: 'online' | 'offline' | 'maintenance'
}

const zones: Zone[] = [
  {
    id: '1',
    name: 'Emergency Department',
    description: 'Emergency and urgent care facilities',
    consumption: 145,
    capacity: 200,
    status: 'normal',
    floor: '1st Floor',
    area: '2,500 sq ft',
    devices: [
      { id: 'd1', name: 'HVAC System', type: 'Climate Control', consumption: 45, status: 'online' },
      { id: 'd2', name: 'Medical Equipment', type: 'Medical', consumption: 35, status: 'online' },
      { id: 'd3', name: 'Lighting', type: 'Lighting', consumption: 25, status: 'online' },
      { id: 'd4', name: 'X-Ray Machine', type: 'Medical', consumption: 40, status: 'online' },
    ],
  },
  {
    id: '2',
    name: 'Operating Rooms',
    description: 'Surgical suites and recovery',
    consumption: 178,
    capacity: 220,
    status: 'warning',
    floor: '2nd Floor',
    area: '3,200 sq ft',
    devices: [
      { id: 'd5', name: 'Surgical Equipment', type: 'Medical', consumption: 65, status: 'online' },
      { id: 'd6', name: 'HVAC System', type: 'Climate Control', consumption: 55, status: 'online' },
      { id: 'd7', name: 'Lighting', type: 'Lighting', consumption: 30, status: 'online' },
      { id: 'd8', name: 'Monitoring Systems', type: 'Medical', consumption: 28, status: 'online' },
    ],
  },
  {
    id: '3',
    name: 'ICU',
    description: 'Intensive Care Unit',
    consumption: 132,
    capacity: 180,
    status: 'normal',
    floor: '3rd Floor',
    area: '2,800 sq ft',
    devices: [
      { id: 'd9', name: 'Life Support Systems', type: 'Medical', consumption: 50, status: 'online' },
      { id: 'd10', name: 'HVAC System', type: 'Climate Control', consumption: 40, status: 'online' },
      { id: 'd11', name: 'Monitoring Equipment', type: 'Medical', consumption: 25, status: 'online' },
      { id: 'd12', name: 'Lighting', type: 'Lighting', consumption: 17, status: 'online' },
    ],
  },
  {
    id: '4',
    name: 'General Wards',
    description: 'Patient rooms and general care',
    consumption: 98,
    capacity: 150,
    status: 'normal',
    floor: '4th-5th Floor',
    area: '8,500 sq ft',
    devices: [
      { id: 'd13', name: 'HVAC System', type: 'Climate Control', consumption: 38, status: 'online' },
      { id: 'd14', name: 'Lighting', type: 'Lighting', consumption: 30, status: 'online' },
      { id: 'd15', name: 'Medical Equipment', type: 'Medical', consumption: 20, status: 'online' },
      { id: 'd16', name: 'Entertainment Systems', type: 'Other', consumption: 10, status: 'online' },
    ],
  },
  {
    id: '5',
    name: 'Radiology',
    description: 'Imaging and diagnostics',
    consumption: 165,
    capacity: 180,
    status: 'critical',
    floor: 'Basement',
    area: '1,800 sq ft',
    devices: [
      { id: 'd17', name: 'MRI Machine', type: 'Medical', consumption: 75, status: 'online' },
      { id: 'd18', name: 'CT Scanner', type: 'Medical', consumption: 50, status: 'online' },
      { id: 'd19', name: 'HVAC System', type: 'Climate Control', consumption: 25, status: 'online' },
      { id: 'd20', name: 'Computer Systems', type: 'IT', consumption: 15, status: 'online' },
    ],
  },
  {
    id: '6',
    name: 'Laboratory',
    description: 'Medical testing and analysis',
    consumption: 87,
    capacity: 120,
    status: 'normal',
    floor: 'Basement',
    area: '1,500 sq ft',
    devices: [
      { id: 'd21', name: 'Lab Equipment', type: 'Medical', consumption: 40, status: 'online' },
      { id: 'd22', name: 'Refrigeration', type: 'Storage', consumption: 25, status: 'online' },
      { id: 'd23', name: 'HVAC System', type: 'Climate Control', consumption: 15, status: 'online' },
      { id: 'd24', name: 'Lighting', type: 'Lighting', consumption: 7, status: 'online' },
    ],
  },
]

export default function ZonesPage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
    }
  }

  const getStatusBadge = (status: Zone['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
    }
  }

  const getDeviceStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'text-green-600'
      case 'offline': return 'text-red-600'
      case 'maintenance': return 'text-yellow-600'
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zone Management</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage hospital zones</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Zone Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Zones</p>
              <p className="text-3xl font-bold text-gray-900">{zones.length}</p>
            </div>
            <div className="text-4xl">🏥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Consumption</p>
              <p className="text-3xl font-bold text-gray-900">
                {zones.reduce((sum, z) => sum + z.consumption, 0).toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">kW</p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Critical Zones</p>
              <p className="text-3xl font-bold text-red-600">
                {zones.filter(z => z.status === 'critical').length}
              </p>
            </div>
            <div className="text-4xl">🚨</div>
          </div>
        </div>
      </div>

      {/* Zones Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const percentage = (zone.consumption / zone.capacity) * 100

            return (
              <div
                key={zone.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedZone(zone)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{zone.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(zone.status)}`}>
                      {zone.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{zone.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Consumption</span>
                      <span className="font-medium text-gray-900">
                        {zone.consumption} / {zone.capacity} kW
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getStatusColor(zone.status)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Floor</p>
                        <p className="text-sm font-medium text-gray-900">{zone.floor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Area</p>
                        <p className="text-sm font-medium text-gray-900">{zone.area}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-1">Devices</p>
                      <p className="text-sm font-medium text-gray-900">{zone.devices.length} active devices</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {zones.map((zone) => {
                const percentage = (zone.consumption / zone.capacity) * 100
                return (
                  <tr key={zone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                      <div className="text-sm text-gray-500">{zone.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.floor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.consumption} kW</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.capacity} kW</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getStatusColor(zone.status)}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{percentage.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(zone.status)}`}>
                        {zone.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedZone(zone)}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Zone Detail Modal */}
      {selectedZone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedZone.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedZone.description}</p>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Current Load</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedZone.consumption} kW</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedZone.capacity} kW</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Floor</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedZone.floor}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Area</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedZone.area}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Devices ({selectedZone.devices.length})</h3>
                <div className="space-y-3">
                  {selectedZone.devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {device.type === 'Medical' ? '🏥' : 
                             device.type === 'Climate Control' ? '❄️' :
                             device.type === 'Lighting' ? '💡' :
                             device.type === 'Storage' ? '📦' :
                             device.type === 'IT' ? '💻' : '⚙️'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{device.name}</p>
                            <p className="text-sm text-gray-500">{device.type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{device.consumption} kW</p>
                        <p className={`text-sm font-medium ${getDeviceStatusColor(device.status)}`}>
                          {device.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
