import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // In a real app, verify the session/token and check admin status
    // This is a mock implementation
    const cookieStore = cookies()
    const token = cookieStore.get('session')
    
    // Mock admin check - replace with actual authentication logic
    const isAdmin = true // For testing, always return true

    return NextResponse.json({ isAdmin })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check admin status" },
      { status: 500 }
    )
  }
} 