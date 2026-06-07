// Energy consumption data types
export interface EnergyReading {
  id: string
  timestamp: Date
  consumption: number // in kW
  zone?: string
}

export interface EnergyStats {
  totalConsumption: number // in kWh
  currentLoad: number // in kW
  peakDemand: number // in kW
  costToday: number // in USD
  change: {
    consumption: number // percentage
    load: number // percentage
    peak: number // percentage
    cost: number // percentage
  }
}

// Zone types
export interface Zone {
  id: string
  name: string
  description?: string
  consumption: number // current consumption in kW
  capacity: number // maximum capacity in kW
  status: 'normal' | 'warning' | 'critical'
  devices?: Device[]
}

export interface Device {
  id: string
  name: string
  type: string
  consumption: number // in kW
  status: 'online' | 'offline' | 'maintenance'
}

// Alert types
export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  zone?: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

// User types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'operator' | 'viewer'
  department?: string
  createdAt: Date
  lastLogin?: Date
}

// Report types
export interface Report {
  id: string
  title: string
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  startDate: Date
  endDate: Date
  zones?: string[]
  generatedAt: Date
  generatedBy: string
  data: ReportData
}

export interface ReportData {
  totalConsumption: number
  averageLoad: number
  peakLoad: number
  totalCost: number
  efficiency: number
  zoneBreakdown: {
    zoneId: string
    zoneName: string
    consumption: number
    percentage: number
  }[]
}

// Settings types
export interface SystemSettings {
  alertThresholds: {
    warning: number // percentage of capacity
    critical: number // percentage of capacity
  }
  targetLoad: number // in kW
  costPerKwh: number // in USD
  dataRetention: number // in days
  refreshInterval: number // in seconds
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
