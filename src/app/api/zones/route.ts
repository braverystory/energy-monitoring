import { NextResponse } from 'next/server'
import type { ApiResponse, Zone } from '@/lib/types'

// Mock data - In production, this would come from a database
const zones: Zone[] = [
  {
    id: '1',
    name: 'Emergency Department',
    description: 'Emergency and urgent care facilities',
    consumption: 145,
    capacity: 200,
    status: 'normal',
  },
  {
    id: '2',
    name: 'Operating Rooms',
    description: 'Surgical suites and recovery',
    consumption: 178,
    capacity: 220,
    status: 'warning',
  },
  {
    id: '3',
    name: 'ICU',
    description: 'Intensive Care Unit',
    consumption: 132,
    capacity: 180,
    status: 'normal',
  },
  {
    id: '4',
    name: 'General Wards',
    description: 'Patient rooms and general care',
    consumption: 98,
    capacity: 150,
    status: 'normal',
  },
  {
    id: '5',
    name: 'Radiology',
    description: 'Imaging and diagnostics',
    consumption: 165,
    capacity: 180,
    status: 'critical',
  },
  {
    id: '6',
    name: 'Laboratory',
    description: 'Medical testing and analysis',
    consumption: 87,
    capacity: 120,
    status: 'normal',
  },
]

export async function GET() {
  try {
    const response: ApiResponse<Zone[]> = {
      success: true,
      data: zones,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<Zone[]> = {
      success: false,
      error: 'Failed to fetch zones',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
