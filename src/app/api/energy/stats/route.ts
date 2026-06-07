import { NextResponse } from 'next/server'
import type { ApiResponse, EnergyStats } from '@/lib/types'

// Mock data - In production, this would come from a database
function getEnergyStats(): EnergyStats {
  return {
    totalConsumption: 2458,
    currentLoad: 312,
    peakDemand: 458,
    costToday: 342,
    change: {
      consumption: -5.2,
      load: 2.1,
      peak: -1.5,
      cost: -3.8,
    },
  }
}

export async function GET() {
  try {
    const stats = getEnergyStats()
    
    const response: ApiResponse<EnergyStats> = {
      success: true,
      data: stats,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<EnergyStats> = {
      success: false,
      error: 'Failed to fetch energy statistics',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
