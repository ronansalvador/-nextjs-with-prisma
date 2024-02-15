'use client'
import { useState } from 'react'
import { useUser } from '../context/userContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'

type User = {
  id?: number
  name: string
  email: string
  token: string
}

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, changeUser } = useUser()

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
      })

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`)
      }

      const newUser: User = await response.json()

      changeUser(newUser)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        console.error('Erro ao Registrar:', error.message)
      }
    }
  }
  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={registrar}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Digite seu nome"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
        />
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
        <button type="submit">Regisrar</button>
        <Link href="/login">Fazer Login</Link>
      </form>
      {user.name && redirect('/')}
    </div>
  )
}

export default RegisterPage
