'use client'
import { useState } from 'react'
import { useUser } from '../context/userContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './style.module.css'

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
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const { user, changeUser } = useUser()
  const URL = process.env.NEXT_PUBLIC_URL_API

  const showToastError = (mensagem: string) => {
    toast.error(mensagem, {
      position: 'top-right',
    })
  }

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      console.log(
        'As senhas não coincidem. Por favor, verifique e tente novamente.',
      )
      showToastError(
        'As senhas não coincidem. Por favor, verifique e tente novamente.',
      )
      return
    }
    try {
      const response = await fetch(`${URL}/api/register`, {
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
        console.error('Erro ao Registrar:', error.message)
      }
    }
  }
  return (
    <section className="section_page">
      <ToastContainer />
      <h1>Registro</h1>
      <form onSubmit={registrar} className="form_login">
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
        <div className={styles.password_input}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="digite sua senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
            className={styles.password_input}
          />

          <button
            className={styles.show_password}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            show
          </button>
        </div>
        <div className={styles.password_input}>
          <input
            type={showPasswordConfirmation ? 'text' : 'password'}
            name="password-confirmation"
            id="password-confirmation"
            placeholder="digite novamente sua senha"
            value={passwordConfirmation}
            onChange={({ target }) => setPasswordConfirmation(target.value)}
            autoComplete="current-password"
          />

          <button
            className={styles.show_password}
            type="button"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
          >
            show
          </button>
        </div>
        <div className="form_buttons">
          <button type="submit">Registrar</button>
          <Link href="/login">Fazer Login</Link>
        </div>
      </form>

      {user.name && redirect('/')}
    </section>
  )
}

export default RegisterPage
