import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse, Alert } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const acknowledged = searchParams.get('acknowledged')
    
    const where: any = {}
    
    // Filter by type if specified
    if (type) {
      where.type = type
    }
    
    // Filter by acknowledged status if specified
    if (acknowledged !== null) {
      where.acknowledged = acknowledged === 'true'
    }
    
    const alerts = await prisma.alert.findMany({
      where,
      include: {
        zone: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    })

    const formattedAlerts: Alert[] = alerts.map(a => ({
      id: a.id,
      type: a.type as 'critical' | 'warning' | 'info',
      title: a.title,
      message: a.message,
      timestamp: a.timestamp,
      zone: a.zone?.name,
      acknowledged: a.acknowledged,
      acknowledgedBy: a.acknowledgedBy || undefined,
      acknowledgedAt: a.acknowledgedAt || undefined,
    }))
    
    const response: ApiResponse<Alert[]> = {
      success: true,
      data: formattedAlerts,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching alerts:', error)
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
    
    const updatedAlert = await prisma.alert.update({
      where: { id: alertId },
      data: {
        acknowledged: true,
        acknowledgedBy,
        acknowledgedAt: new Date(),
      },
      include: {
        zone: {
          select: {
            name: true,
          },
        },
      },
    })
    
    const formattedAlert: Alert = {
      id: updatedAlert.id,
      type: updatedAlert.type as 'critical' | 'warning' | 'info',
      title: updatedAlert.title,
      message: updatedAlert.message,
      timestamp: updatedAlert.timestamp,
      zone: updatedAlert.zone?.name,
      acknowledged: updatedAlert.acknowledged,
      acknowledgedBy: updatedAlert.acknowledgedBy || undefined,
      acknowledgedAt: updatedAlert.acknowledgedAt || undefined,
    }
    
    const response: ApiResponse<Alert> = {
      success: true,
      data: formattedAlert,
      message: 'Alert acknowledged successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error acknowledging alert:', error)
    const errorResponse: ApiResponse<Alert> = {
      success: false,
      error: 'Failed to acknowledge alert',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
