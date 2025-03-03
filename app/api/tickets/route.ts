import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For demo, we'll get tickets from localStorage on the client side
    return NextResponse.json({ message: "Use client-side localStorage for demo" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, subject, description, priority } = body

    const ticket = {
      id: Math.random().toString(36).substring(7),
      clientName,
      subject,
      description,
      status: 'open',
      priority,
      createdAt: new Date().toISOString(),
    }

    // For demo, we'll store in localStorage on the client side
    return NextResponse.json(ticket)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    // For demo, update will be handled in localStorage on client side
    return NextResponse.json({ message: "Ticket updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
} 