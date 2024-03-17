'use client'
import React, { useState } from 'react'
import { useUser } from '../context/userContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PasswordInput from '../components/passwordInput'

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

  const showToastError = (mensagem: string) => {
    toast.error(mensagem, {
      position: 'top-right',
    })
  }

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
        const error = await response.json()
        showToastError(error.message)
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
    <section className="section_page">
      <ToastContainer />
      <h1>Login</h1>
      <form onSubmit={logar} className="form_login">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@email.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          autoComplete="username"
        />
        <PasswordInput
          passwordValue={password}
          placeholder="digite sua senha"
          setPassword={setPassword}
        />
        <div className="form_buttons">
          <button type="submit">Logar</button>
          <Link href="/register">Registrar</Link>
        </div>
      </form>
      {user.name && redirect('/')}
    </section>
  )
}

export default LoginPage
