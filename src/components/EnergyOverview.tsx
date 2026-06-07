'use client'

interface EnergyCard {
  title: string
  value: string
  unit: string
  change: number
  icon: string
  color: string
}

const energyData: EnergyCard[] = [
  {
    title: 'Total Consumption',
    value: '2,458',
    unit: 'kWh',
    change: -5.2,
    icon: '⚡',
    color: 'bg-blue-500',
  },
  {
    title: 'Current Load',
    value: '312',
    unit: 'kW',
    change: 2.1,
    icon: '🔌',
    color: 'bg-green-500',
  },
  {
    title: 'Peak Demand',
    value: '458',
    unit: 'kW',
    change: -1.5,
    icon: '📊',
    color: 'bg-orange-500',
  },
  {
    title: 'Cost Today',
    value: '$342',
    unit: 'USD',
    change: -3.8,
    icon: '💰',
    color: 'bg-purple-500',
  },
]

export default function EnergyOverview() {
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
                  {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
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
