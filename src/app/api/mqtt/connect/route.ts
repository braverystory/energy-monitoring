import { NextResponse } from 'next/server'
import { mqttService } from '@/lib/mqtt-client'
import type { ApiResponse } from '@/lib/types'

export async function POST() {
  try {
    mqttService.connect()
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'MQTT client connection initiated',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error connecting MQTT:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to connect MQTT client',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function DELETE() {
  try {
    mqttService.disconnect()
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'MQTT client disconnected',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error disconnecting MQTT:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to disconnect MQTT client',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
