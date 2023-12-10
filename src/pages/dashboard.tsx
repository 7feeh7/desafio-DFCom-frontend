import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../components/Tables'
import { useUserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import HorizontalMenu from '../components/HorizontalMenu'
import { useAuthContext } from '../contexts/AuthContext'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { listUsers } = useUserContext()

  const { user, signOut, isAuthenticated, updateRefreshToken } =
    useAuthContext()

  const [users, setUsers] = useState([])

  if (!isAuthenticated) updateRefreshToken()

  const router = useRouter()

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await listUsers()
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }

    fetchUsers()
  }, [listUsers])

  function logout() {
    signOut()
    return router.push('/')
  }

  return (
    <>
      <HorizontalMenu userEmail={user?.email} onLogout={logout} />

      <Stack marginTop={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'dfcom-accessToken': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
