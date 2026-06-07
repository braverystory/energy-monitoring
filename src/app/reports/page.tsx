'use client'

import { useState } from 'react'

interface Report {
  id: string
  title: string
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  startDate: Date
  endDate: Date
  generatedAt: Date
  generatedBy: string
  status: 'completed' | 'generating' | 'failed'
}

const reports: Report[] = [
  {
    id: '1',
    title: 'Weekly Energy Consumption Report',
    type: 'weekly',
    startDate: new Date('2026-05-31'),
    endDate: new Date('2026-06-06'),
    generatedAt: new Date('2026-06-07T08:00:00'),
    generatedBy: 'admin@hospital.com',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Monthly Performance Analysis',
    type: 'monthly',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-05-31'),
    generatedAt: new Date('2026-06-01T09:30:00'),
    generatedBy: 'admin@hospital.com',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Daily Operations Summary',
    type: 'daily',
    startDate: new Date('2026-06-06'),
    endDate: new Date('2026-06-06'),
    generatedAt: new Date('2026-06-07T00:15:00'),
    generatedBy: 'system',
    status: 'completed',
  },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const zones = [
    'Emergency Department',
    'Operating Rooms',
    'ICU',
    'General Wards',
    'Radiology',
    'Laboratory',
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert('Report generated successfully!')
    }, 2000)
  }

  const handleDownload = (reportId: string, format: 'pdf' | 'excel' | 'csv') => {
    alert(`Downloading report ${reportId} as ${format.toUpperCase()}`)
  }

  const toggleZone = (zone: string) => {
    setSelectedZones(prev =>
      prev.includes(zone)
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Generate and download energy consumption reports</p>
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>

          {/* Date Range */}
          {reportType === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>

        {/* Zone Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Zones (Optional)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {zones.map((zone) => (
              <label key={zone} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedZones.includes(zone)}
                  onChange={() => toggleZone(zone)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{zone}</span>
              </label>
            ))}
          </div>
          {selectedZones.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">All zones will be included</p>
          )}
        </div>

        {/* Report Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Report Contents</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Energy Consumption Summary</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Cost Analysis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Peak Demand Analysis</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Efficiency Metrics</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Zone Breakdown</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Trend Analysis</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating Report...' : 'Generate Report'}
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>
        
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' :
                      report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      📅 {report.startDate.toLocaleDateString()} - {report.endDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      🕐 Generated {report.generatedAt.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      👤 {report.generatedBy}
                    </span>
                  </div>
                </div>

                <div className="text-4xl">
                  {report.type === 'daily' ? '📄' :
                   report.type === 'weekly' ? '📊' :
                   report.type === 'monthly' ? '📈' : '📋'}
                </div>
              </div>

              {report.status === 'completed' && (
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => handleDownload(report.id, 'pdf')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                  >
                    📄 Download PDF
                  </button>
                  <button
                    onClick={() => handleDownload(report.id, 'excel')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    📊 Download Excel
                  </button>
                  <button
                    onClick={() => handleDownload(report.id, 'csv')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    📋 Download CSV
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium">
                    👁️ Preview
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Report Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Daily Summary</h3>
            <p className="text-sm text-gray-600 mb-4">Yesterday's energy consumption and costs</p>
            <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 text-sm font-medium">
              Generate Now
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-900 mb-2">Weekly Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Last 7 days trends and patterns</p>
            <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 text-sm font-medium">
              Generate Now
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Cost Report</h3>
            <p className="text-sm text-gray-600 mb-4">Detailed cost breakdown by zone</p>
            <button className="w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 text-sm font-medium">
              Generate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
