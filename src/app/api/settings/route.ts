import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse } from '@/lib/types'

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()

    const response: ApiResponse<any> = {
      success: true,
      data: settings,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching settings:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to fetch settings',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Get the first settings record or create if doesn't exist
    const existingSettings = await prisma.settings.findFirst()
    
    let settings
    if (existingSettings) {
      settings = await prisma.settings.update({
        where: { id: existingSettings.id },
        data: body,
      })
    } else {
      settings = await prisma.settings.create({
        data: { ...body, id: '1' },
      })
    }

    const response: ApiResponse<any> = {
      success: true,
      data: settings,
      message: 'Settings updated successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating settings:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to update settings',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
