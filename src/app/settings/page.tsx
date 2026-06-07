'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'alerts' | 'users' | 'system'>('general')
  
  // General Settings
  const [costPerKwh, setCostPerKwh] = useState('0.139')
  const [currency, setCurrency] = useState('USD')
  const [refreshInterval, setRefreshInterval] = useState('5')
  const [dataRetention, setDataRetention] = useState('90')

  // Alert Settings
  const [warningThreshold, setWarningThreshold] = useState('80')
  const [criticalThreshold, setCriticalThreshold] = useState('90')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure system preferences and parameters</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {(['general', 'alerts', 'users', 'system'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per kWh
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.001"
                      value={costPerKwh}
                      onChange={(e) => setCostPerKwh(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Used for cost calculations</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">How often data refreshes</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention (days)
                  </label>
                  <input
                    type="number"
                    value={dataRetention}
                    onChange={(e) => setDataRetention(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">How long to keep historical data</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>America/New_York (UTC-5)</option>
                    <option>America/Chicago (UTC-6)</option>
                    <option>America/Los_Angeles (UTC-8)</option>
                    <option>Europe/London (UTC+0)</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Display times in this zone</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Show real-time updates</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Display percentage changes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Enable dark mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Show zone status indicators</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Alert Settings */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Alert Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Warning Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={warningThreshold}
                    onChange={(e) => setWarningThreshold(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Trigger warning at this capacity</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Critical Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={criticalThreshold}
                    onChange={(e) => setCriticalThreshold(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Trigger critical alert at this capacity</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive alerts via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={(e) => setSmsNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                {emailNotifications && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Recipients
                    </label>
                    <textarea
                      rows={3}
                      placeholder="admin@hospital.com, operator@hospital.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Comma-separated email addresses</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Priorities</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">High energy consumption</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">System overload warnings</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Device malfunction alerts</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Unusual pattern detection</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Maintenance reminders</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                  + Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin User</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin@hospital.com</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Admin
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Operator</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">operator@hospital.com</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Operator
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Viewer</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">viewer@hospital.com</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Viewer
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Inactive
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Admin</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Full system access</li>
                      <li>✓ User management</li>
                      <li>✓ Settings configuration</li>
                      <li>✓ Report generation</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Operator</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ View dashboards</li>
                      <li>✓ Acknowledge alerts</li>
                      <li>✓ Generate reports</li>
                      <li>✗ Settings access</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Viewer</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ View dashboards</li>
                      <li>✓ View reports</li>
                      <li>✗ Acknowledge alerts</li>
                      <li>✗ Settings access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">System Version</p>
                  <p className="text-lg font-semibold text-gray-900">v1.0.0</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Database Status</p>
                  <p className="text-lg font-semibold text-green-600">Connected</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Last Backup</p>
                  <p className="text-lg font-semibold text-gray-900">2 hours ago</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Uptime</p>
                  <p className="text-lg font-semibold text-gray-900">15 days 7 hours</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance</h3>
                <div className="space-y-3">
                  <button className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                    Backup Database
                  </button>
                  <button className="w-full md:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium ml-0 md:ml-3">
                    Clear Cache
                  </button>
                  <button className="w-full md:w-auto px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium ml-0 md:ml-3">
                    Export Logs
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <p className="text-sm text-red-800 mb-3">
                    These actions are irreversible. Please be certain.
                  </p>
                  <div className="space-y-2">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm">
                      Reset All Settings
                    </button>
                    <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium text-sm ml-3">
                      Clear All Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="border-t pt-6 flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              Save Changes
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
