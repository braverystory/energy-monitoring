import { NextResponse } from 'next/server'
import type { ApiResponse, EnergyReading } from '@/lib/types'

// Mock real-time data generator
function generateRealtimeData(count: number = 12): EnergyReading[] {
  const data: EnergyReading[] = []
  const now = new Date()
  
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60000) // 5-minute intervals
    data.push({
      id: `reading-${timestamp.getTime()}`,
      timestamp,
      consumption: 280 + Math.random() * 80,
    })
  }
  
  return data
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '12')
    const zone = searchParams.get('zone')
    
    const readings = generateRealtimeData(count)
    
    // Filter by zone if specified
    const filteredReadings = zone 
      ? readings.filter(r => r.zone === zone)
      : readings
    
    const response: ApiResponse<EnergyReading[]> = {
      success: true,
      data: filteredReadings,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<EnergyReading[]> = {
      success: false,
      error: 'Failed to fetch real-time readings',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
