'use client'

interface Zone {
  id: string
  name: string
  consumption: number
  capacity: number
  status: 'normal' | 'warning' | 'critical'
}

const zones: Zone[] = [
  {
    id: '1',
    name: 'Emergency Department',
    consumption: 145,
    capacity: 200,
    status: 'normal',
  },
  {
    id: '2',
    name: 'Operating Rooms',
    consumption: 178,
    capacity: 220,
    status: 'warning',
  },
  {
    id: '3',
    name: 'ICU',
    consumption: 132,
    capacity: 180,
    status: 'normal',
  },
  {
    id: '4',
    name: 'General Wards',
    consumption: 98,
    capacity: 150,
    status: 'normal',
  },
  {
    id: '5',
    name: 'Radiology',
    consumption: 165,
    capacity: 180,
    status: 'critical',
  },
  {
    id: '6',
    name: 'Laboratory',
    consumption: 87,
    capacity: 120,
    status: 'normal',
  },
]

export default function ZoneMonitoring() {
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
