import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse, EnergyReading } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '12')
    const zoneFilter = searchParams.get('zone')
    
    const now = new Date()
    const timeAgo = new Date(now.getTime() - count * 5 * 60000) // 5-minute intervals
    
    // Build query
    const where: any = {
      timestamp: {
        gte: timeAgo,
      },
    }
    
    if (zoneFilter) {
      const zone = await prisma.zone.findFirst({
        where: { name: zoneFilter },
      })
      if (zone) {
        where.zoneId = zone.id
      }
    }
    
    const readings = await prisma.energyReading.findMany({
      where,
      orderBy: {
        timestamp: 'asc',
      },
      take: count,
      include: {
        zone: {
          select: {
            name: true,
          },
        },
      },
    })
    
    const formattedReadings: EnergyReading[] = readings.map(r => ({
      id: r.id,
      timestamp: r.timestamp,
      consumption: r.consumption,
      zone: r.zone?.name,
    }))
    
    const response: ApiResponse<EnergyReading[]> = {
      success: true,
      data: formattedReadings,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching real-time readings:', error)
    const errorResponse: ApiResponse<EnergyReading[]> = {
      success: false,
      error: 'Failed to fetch real-time readings',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
