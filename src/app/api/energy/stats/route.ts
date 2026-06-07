import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse, EnergyStats } from '@/lib/types'

export async function GET() {
  try {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    const startOfYesterday = new Date(startOfToday)
    startOfYesterday.setDate(startOfYesterday.getDate() - 1)

    // Get today's readings
    const todayReadings = await prisma.energyReading.findMany({
      where: {
        timestamp: {
          gte: startOfToday,
        },
      },
    })

    // Get yesterday's readings for comparison
    const yesterdayReadings = await prisma.energyReading.findMany({
      where: {
        timestamp: {
          gte: startOfYesterday,
          lt: startOfToday,
        },
      },
    })

    // Calculate today's stats
    const totalConsumption = todayReadings.reduce((sum, r) => sum + r.consumption, 0)
    const currentLoad = todayReadings.length > 0 
      ? todayReadings[todayReadings.length - 1].consumption 
      : 0
    const peakDemand = Math.max(...todayReadings.map(r => r.consumption), 0)
    const costToday = todayReadings.reduce((sum, r) => sum + (r.cost || 0), 0)

    // Calculate yesterday's stats for comparison
    const yesterdayConsumption = yesterdayReadings.reduce((sum, r) => sum + r.consumption, 0)
    const yesterdayPeak = Math.max(...yesterdayReadings.map(r => r.consumption), 0)
    const yesterdayCost = yesterdayReadings.reduce((sum, r) => sum + (r.cost || 0), 0)

    // Calculate percentage changes
    const consumptionChange = yesterdayConsumption > 0 
      ? ((totalConsumption - yesterdayConsumption) / yesterdayConsumption) * 100 
      : 0
    const peakChange = yesterdayPeak > 0 
      ? ((peakDemand - yesterdayPeak) / yesterdayPeak) * 100 
      : 0
    const costChange = yesterdayCost > 0 
      ? ((costToday - yesterdayCost) / yesterdayCost) * 100 
      : 0

    const stats: EnergyStats = {
      totalConsumption: Math.round(totalConsumption),
      currentLoad: Math.round(currentLoad),
      peakDemand: Math.round(peakDemand),
      costToday: Math.round(costToday),
      change: {
        consumption: Number(consumptionChange.toFixed(1)),
        load: 2.1, // Current load change would need more complex tracking
        peak: Number(peakChange.toFixed(1)),
        cost: Number(costChange.toFixed(1)),
      },
    }
    
    const response: ApiResponse<EnergyStats> = {
      success: true,
      data: stats,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching energy stats:', error)
    const errorResponse: ApiResponse<EnergyStats> = {
      success: false,
      error: 'Failed to fetch energy statistics',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
