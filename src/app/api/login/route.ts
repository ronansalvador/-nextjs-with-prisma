import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { newToken } from '../register/route'

const compareHash = (password: string, originalHash: string) => {
  const newHash = createHash('md5').update(password).digest('hex')

  return newHash === originalHash
}

export async function POST(req: Request) {
  const { email, password } = await req.json()
  console.log(email, password)

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          message: 'Email inválido',
        },
        { status: 404 },
      )
    }

    const hashOriginal = user.password
    const decrypt = compareHash(password, hashOriginal)
    if (decrypt !== true) {
      console.log('esta dando erro aqui de senha')
      return NextResponse.json(
        {
          message: 'Senha incorreta',
        },
        { status: 404 },
      )
    }

    const { password: _, ...userWithoutPassword } = user
    const token = newToken(userWithoutPassword)

    return NextResponse.json(
      { ...userWithoutPassword, token },

      { status: 200 },
    )
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
