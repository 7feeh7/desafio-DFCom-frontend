import api from '../service/api'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'

type User = {
  email: string
  password: string
}

interface ContextProps {
  createUser: (data: User) => Promise<void>
  listUsers: () => Promise<User[]>
}

const Context = createContext({} as ContextProps)

export function UserProvider({ children }: PropsWithChildren) {
  async function createUser({ email, password }: User) {
    await api.post('/users/', { email, password })
  }

  async function listUsers() {
    const response = await api.get('/users')
    return response.data as User[]
  }

  return (
    <Context.Provider
      value={{
        createUser,
        listUsers,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useUserContext() {
  return useContext(Context)
}
