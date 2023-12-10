import { AuthProvider } from '../contexts/AuthContext'
import { SnackbarProvider } from '../contexts/SnackbarContext'
import { UserProvider } from '../contexts/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}
export default MyApp
