import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const zone = await prisma.zone.findUnique({
      where: { id: params.id },
      include: {
        devices: true,
      },
    })

    if (!zone) {
      return NextResponse.json(
        { success: false, error: 'Zone not found' },
        { status: 404 }
      )
    }

    // Get recent readings for this zone
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60000)

    const recentReadings = await prisma.energyReading.findMany({
      where: {
        zoneId: zone.id,
        timestamp: {
          gte: oneHourAgo,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 10,
    })

    // Calculate current consumption
    const consumption = recentReadings.length > 0
      ? recentReadings.reduce((sum, r) => sum + r.consumption, 0) / recentReadings.length
      : 0

    const utilization = (consumption / zone.capacity) * 100
    const status: 'normal' | 'warning' | 'critical' = 
      utilization >= 90 ? 'critical' : utilization >= 80 ? 'warning' : 'normal'

    const response: ApiResponse<any> = {
      success: true,
      data: {
        ...zone,
        consumption: Math.round(consumption),
        status,
        devices: zone.devices,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching zone details:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to fetch zone details',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
