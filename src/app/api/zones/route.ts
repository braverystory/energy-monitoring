import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse, Zone } from '@/lib/types'

function getZoneStatus(consumption: number, capacity: number): 'normal' | 'warning' | 'critical' {
  const utilization = (consumption / capacity) * 100
  if (utilization >= 90) return 'critical'
  if (utilization >= 80) return 'warning'
  return 'normal'
}

export async function GET() {
  try {
    const zones = await prisma.zone.findMany({
      include: {
        devices: true,
      },
    })

    // Get latest consumption for each zone
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60000)

    const zonesWithData = await Promise.all(
      zones.map(async (zone) => {
        // Get recent readings for this zone
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

        // Calculate current consumption (average of recent readings)
        const consumption = recentReadings.length > 0
          ? recentReadings.reduce((sum, r) => sum + r.consumption, 0) / recentReadings.length
          : 0

        const status = getZoneStatus(consumption, zone.capacity)

        return {
          id: zone.id,
          name: zone.name,
          description: zone.description || undefined,
          consumption: Math.round(consumption),
          capacity: zone.capacity,
          status,
        } as Zone
      })
    )

    const response: ApiResponse<Zone[]> = {
      success: true,
      data: zonesWithData,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching zones:', error)
    const errorResponse: ApiResponse<Zone[]> = {
      success: false,
      error: 'Failed to fetch zones',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
