import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, route: { params: { id: string } }) {
  const id: number = Number(route.params.id)
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return Response.json(user)
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

export async function DELETE(req: Request, route: { params: { id: string } }) {
  const id: number = Number(route.params.id)
  try {
    const user = await prisma.user.delete({ where: { id } })
    return Response.json(user)
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

export async function PUT(req: Request, route: { params: { id: string } }) {
  const id: number = Number(route.params.id)
  const { name } = await req.json()
  try {
    const user = await prisma.user.update({ where: { id }, data: { name } })
    return Response.json(user)
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
