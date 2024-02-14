'use client'
import React, { useState } from 'react'

interface UserType {
  id: Number | String
  name: string
  email: string
  password: string
}

interface ServerResponse {
  user: UserType
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<UserType>({
    id: '',
    name: '',
    email: '',
    password: '',
  })

  const logar = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('entrou')

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`)
      }

      const responseData: ServerResponse = await response.json()
      const newUser = responseData.user
      console.log('newUser', newUser)

      setUser(newUser)
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
      </form>
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      )}
    </div>
  )
}

export default LoginPage
