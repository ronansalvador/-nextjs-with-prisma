import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
const jwt = require('jsonwebtoken')

export interface UserCreate {
  name: string
  email: string
  password: string
}

export interface UserReturn extends UserCreate {
  id: number
}

export interface userCreateToken {
  name: string
  email: string
}

export interface UserWithToken {
  id: number
  name: string
  email: string
  token: string
}

const createPassword = (password: string) => {
  const newHash = createHash('md5').update(password).digest('hex')

  return newHash
}

const newToken = (data: userCreateToken) => {
  const token = jwt.sign({ data }, 'teste-ronan', {
    expiresIn: '7d',
    algorithm: 'HS256',
  })
  return token
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  try {
    const decrypt = createPassword(password)
    const register: UserReturn = await prisma.user.create({
      data: {
        name,
        email,
        password: decrypt,
      },
    })

    const { password: _, ...userWithoutPassword } = register
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
