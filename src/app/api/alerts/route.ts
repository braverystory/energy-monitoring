import { NextResponse } from 'next/server'
import type { ApiResponse, Alert } from '@/lib/types'

// Mock data - In production, this would come from a database
const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Energy Consumption',
    message: 'Radiology department exceeding normal consumption by 15%',
    timestamp: new Date(Date.now() - 2 * 60000),
    zone: 'Radiology',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Peak Load Approaching',
    message: 'Operating Rooms approaching peak capacity threshold',
    timestamp: new Date(Date.now() - 15 * 60000),
    zone: 'Operating Rooms',
    acknowledged: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance Scheduled',
    message: 'Scheduled maintenance for backup generators at 2:00 AM',
    timestamp: new Date(Date.now() - 60 * 60000),
    acknowledged: true,
    acknowledgedBy: 'admin@hospital.com',
    acknowledgedAt: new Date(Date.now() - 50 * 60000),
  },
  {
    id: '4',
    type: 'warning',
    title: 'Unusual Pattern Detected',
    message: 'Emergency Department showing irregular consumption pattern',
    timestamp: new Date(Date.now() - 120 * 60000),
    zone: 'Emergency Department',
    acknowledged: false,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const acknowledged = searchParams.get('acknowledged')
    
    let filteredAlerts = [...alerts]
    
    // Filter by type if specified
    if (type) {
      filteredAlerts = filteredAlerts.filter(a => a.type === type)
    }
    
    // Filter by acknowledged status if specified
    if (acknowledged !== null) {
      const isAcknowledged = acknowledged === 'true'
      filteredAlerts = filteredAlerts.filter(a => a.acknowledged === isAcknowledged)
    }
    
    const response: ApiResponse<Alert[]> = {
      success: true,
      data: filteredAlerts,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<Alert[]> = {
      success: false,
      error: 'Failed to fetch alerts',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { alertId, acknowledgedBy } = body
    
    // In production, update the database
    const alert = alerts.find(a => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
      alert.acknowledgedBy = acknowledgedBy
      alert.acknowledgedAt = new Date()
    }
    
    const response: ApiResponse<Alert> = {
      success: true,
      data: alert,
      message: 'Alert acknowledged successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<Alert> = {
      success: false,
      error: 'Failed to acknowledge alert',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
