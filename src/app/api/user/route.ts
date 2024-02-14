import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  try {
    const user = await prisma.user.create({ data: { name, email, password } })
    console.log(user)
    return Response.json({ user })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}
