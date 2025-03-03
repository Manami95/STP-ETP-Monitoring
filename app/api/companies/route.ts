import { NextResponse } from 'next/server'

// Mock data - Replace with your actual database query
const companies = [
  { id: "1", name: "Company A" },
  { id: "2", name: "Company B" },
  { id: "3", name: "Company C" },
]

export async function GET() {
  try {
    // In a real app, fetch this from your database
    return NextResponse.json(companies)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    )
  }
} 