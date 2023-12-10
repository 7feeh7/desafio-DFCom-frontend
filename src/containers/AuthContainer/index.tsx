'use client'
import { Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import { AuthContent } from './style'
import Image from 'next/image'
import logoSvg from '../../assets/logo.svg'
interface AuthContainerProps {
  centralized?: boolean
}

function AuthContainer({
  children,
  centralized = false,
}: PropsWithChildren<AuthContainerProps>) {
  return (
    <AuthContent>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
        }}
      >
        {!centralized && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: '50vw',
            }}
          >
            <Image
              src={logoSvg}
              alt="DFCom"
              width={300}
              height={300}
              priority
            />
          </Stack>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: centralized ? '100vw' : '50vw',
          }}
        >
          {children}
        </Stack>
      </Stack>
    </AuthContent>
  )
}

export default AuthContainer
