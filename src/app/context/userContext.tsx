'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import saveUser from '../helper/saveUser'

type User = {
  id?: number
  name: string
  email: string
  token: string
}

interface UserContextProps {
  user: User
  changeUser: () => void
}

const UserContext = createContext<UserContextProps>({
  user: (localStorage.getItem('user') as unknown as User) || '',
  changeUser: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const isBrowser = typeof window !== "undefined";{
  const [user, setUser] = useState<User>({ name: '', email: '', token: '' })

  const changeUser = () => {
    const newUser = { name: '', email: '', token: '' }
    setUser(newUser) // Atualize o estado local primeiro
    saveUser(newUser) // E depois chama a função para salvar no localStorage
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('theme') || 'light'
    // setUser(savedTheme as User)
  }, [])

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
