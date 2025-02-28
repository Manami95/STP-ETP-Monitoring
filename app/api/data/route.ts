import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Fetch data from your database or external API
  const data = [
    { name: "pH", value: 7.5 },
    { name: "COD", value: 200 },
    // ... other parameters
  ]

  return NextResponse.json(data)
}

