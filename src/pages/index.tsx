import AuthContainer from '../containers/AuthContainer'
import AuthBox from '../containers/AuthBox'
import { Stack, Typography } from '@mui/material'
import PasswordField from '../components/Forms/PasswordField'
import TextField from '../components/Forms/TextField'
import { useForm } from 'react-hook-form'
import ActionButton from '../components/ActionButton'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { useAuthContext } from '../contexts/AuthContext'
import { useSnackbarContext } from '../contexts/SnackbarContext'

export default function Home() {
  const { control, watch, setError, handleSubmit } = useForm()

  const { push } = useRouter()

  const { signIn } = useAuthContext()

  const { snackSuccess, snackError } = useSnackbarContext()

  async function onHandleSubmit() {
    try {
      const data = watch()

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().required('Senha é obrigatória'),
      })
      await schema.validate(data, { abortEarly: false })
      await handleLogin(data)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path !== undefined) {
            setError(err.path, {
              type: 'manual',
              message: err.message,
            })
          }
        })
      }
    }
  }

  function onHandleRegister() {
    push('/register')
  }

  async function handleLogin(data) {
    try {
      await signIn(data)
      snackSuccess('Autenticado com sucesso')
      setTimeout(() => {
        push('/dashboard')
      }, 2000)
    } catch (err) {
      snackError('Erro ao logar')
    }
  }

  return (
    <AuthContainer>
      <AuthBox
        title="Login"
        actions={
          <ActionButton
            resolveMsg="Entrar"
            onResolve={handleSubmit(onHandleSubmit)}
          />
        }
      >
        <Stack spacing={2}>
          <TextField control={control} name="email" label="E-mail" />

          <PasswordField control={control} name="password" label="Senha" />

          <Typography
            color="#00929f"
            sx={{ cursor: 'pointer' }}
            onClick={onHandleRegister}
          >
            Cadastre-se
          </Typography>
        </Stack>
      </AuthBox>
    </AuthContainer>
  )
}
