import { destroyCookie, parseCookies, setCookie } from 'nookies'
import api from '../service/api'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type User = {
  email: string
  password: string
}

type SignData = {
  email: string
  password: string
}

interface ContextProps {
  isAuthenticated: boolean
  signIn(data: SignData): Promise<void>
  user: User
  signOut(): void
  updateRefreshToken(): Promise<void>
}

const Context = createContext({} as ContextProps)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  async function signIn({ email, password }) {
    const response = await api.post('/auth/login', {
      email,
      password,
    })

    const { accessToken, refreshToken, user } = response.data

    setCookie(undefined, 'dfcom-accessToken', accessToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'dfcom-refreshToken', refreshToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers.Authorization = `Bearer ${accessToken}`

    setUser(user)
  }

  async function signOut() {
    destroyCookie(undefined, 'dfcom-accessToken')
    destroyCookie(undefined, 'dfcom-refreshToken')
    setUser(null)
  }

  async function updateRefreshToken() {
    const { 'dfcom-refreshToken': oldRefreshToken } = parseCookies()

    if (!oldRefreshToken) return

    const response = await api.post('/auth/refresh-token', {
      oldRefreshToken,
    })

    const { accessToken, refreshToken, user } = response.data

    setCookie(undefined, 'dfcom-accessToken', accessToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'dfcom-refreshToken', refreshToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers.Authorization = `Bearer ${accessToken}`

    setUser(user)
  }

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        signIn,
        user,
        signOut,
        updateRefreshToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useAuthContext() {
  return useContext(Context)
}
