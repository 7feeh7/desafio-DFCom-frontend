import { Card, Stack, Typography } from '@mui/material'
import AuthContainer from '../containers/AuthContainer'
import ActionButton from '../components/ActionButton'
import { useForm } from 'react-hook-form'
import PasswordField from '../components/Forms/PasswordField'
import TextField from '../components/Forms/TextField'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { useSnackbarContext } from '../contexts/SnackbarContext'
import { useUserContext } from '../contexts/UserContext'

export default function SignUp() {
  const { control, watch, setError, handleSubmit } = useForm()

  const { push } = useRouter()

  const { createUser } = useUserContext()

  const { snackSuccess, snackError } = useSnackbarContext()

  const onHandleCancel = () => push('/')

  async function onHandleSubmit() {
    try {
      const data = watch()

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().required('Senha é obrigatória'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
          .required('Confirmação de senha é obrigatória'),
      })

      await schema.validate(data, { abortEarly: false })

      const { email, password } = data
      await handleRegister({ email, password })
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

  async function handleRegister(data) {
    console.log('eae')
    try {
      const { email, password } = data
      await createUser({ email, password })
      snackSuccess('Usuário cadastrado com sucesso')

      setTimeout(() => {
        push('/')
      }, 2000)
    } catch (error) {
      snackError('Erro ao cadastrar usuário')
    }
  }

  return (
    <AuthContainer centralized>
      <Card
        sx={{
          width: '30rem',
          height: '30rem',
        }}
      >
        <Stack
          sx={{
            p: 4,
            height: 'calc(30rem - 20px)',
          }}
        >
          <Stack spacing={8} direction="column">
            <Typography color="#00929f" fontSize={36} fontWeight={700}>
              Cadastre-se
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={2}>
                <TextField
                  control={control}
                  name="email"
                  label="E-mail"
                  type="email"
                />

                <PasswordField
                  control={control}
                  name="password"
                  label="Senha"
                />

                <PasswordField
                  control={control}
                  name="password_confirmation"
                  label="Confirmar senha"
                />
              </Stack>
            </Stack>
            <ActionButton
              rejectMsg="CANCELAR"
              resolveMsg="CADASTRAR"
              onReject={onHandleCancel}
              onResolve={handleSubmit(onHandleSubmit)}
            />
          </Stack>
        </Stack>
      </Card>
    </AuthContainer>
  )
}
