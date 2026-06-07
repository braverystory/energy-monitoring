import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ApiResponse } from '@/lib/types'

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        generatedAt: 'desc',
      },
      take: 20,
    })

    const response: ApiResponse<any[]> = {
      success: true,
      data: reports,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching reports:', error)
    const errorResponse: ApiResponse<any[]> = {
      success: false,
      error: 'Failed to fetch reports',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, type, startDate, endDate, generatedBy, zones } = body

    // In a real application, you would generate the actual report data here
    const reportData = {
      totalConsumption: 0,
      totalCost: 0,
      zones: zones || [],
    }

    const report = await prisma.report.create({
      data: {
        title,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        generatedBy,
        status: 'completed',
        data: JSON.stringify(reportData),
      },
    })

    const response: ApiResponse<any> = {
      success: true,
      data: report,
      message: 'Report generated successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating report:', error)
    const errorResponse: ApiResponse<any> = {
      success: false,
      error: 'Failed to generate report',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
