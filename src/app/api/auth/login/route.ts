import { NextResponse } from 'next/server'
import type { ApiResponse, User } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In production, validate credentials against database
    // For now, accept any credentials for demo purposes
    
    if (!email || !password) {
      const errorResponse: ApiResponse<User> = {
        success: false,
        error: 'Email and password are required',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Mock user data
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin',
      createdAt: new Date(),
      lastLogin: new Date(),
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: 'Login successful',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<User> = {
      success: false,
      error: 'Login failed',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
