'use client'
import React, { useState } from 'react'
import { useUser } from '../context/userContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface UserType {
  id: Number | String
  name: string
  email: string
  password: string
}

type User = {
  id?: number
  name: string
  email: string
  token: string
}

interface ServerResponse {
  user: User
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, changeUser } = useUser()
  const URL = process.env.NEXT_PUBLIC_URL_API

  const logar = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`${URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`)
      }

      const newUser: User = await response.json()

      changeUser(newUser)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao fazer login:', error.message)
      }
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={logar}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@email.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="digite sua senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Logar</button>
        <Link href="/register">Registrar</Link>
      </form>
      {user.name && redirect('/')}
    </div>
  )
}

export default LoginPage
