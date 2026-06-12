import { NextResponse } from 'next/server'
import { mqttService } from '@/lib/mqtt-client'
import type { ApiResponse } from '@/lib/types'

export async function GET() {
  try {
    const status = mqttService.getStatus()
    
    const response: ApiResponse<any> = {
      success: true,
      data: status,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error getting MQTT status:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to get MQTT status',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
