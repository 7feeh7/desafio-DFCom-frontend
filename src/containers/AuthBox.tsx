'use client'

import { Card, Stack, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface AuthBoxProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}
function AuthBox({
  title,
  subtitle,
  children,
  actions,
}: PropsWithChildren<AuthBoxProps>) {
  return (
    <Card
      sx={{
        width: '25rem',
        height: '25rem',
      }}
    >
      <Stack
        sx={{
          p: 4,
          height: 'calc(25rem - 20px)',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            height: '90%',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography color="#00929f" fontSize={36} fontWeight={700}>
              {title}
            </Typography>
            {subtitle && <Typography>{subtitle}</Typography>}
          </div>
          <div>{children}</div>
          <div>{actions}</div>
        </Stack>
      </Stack>
    </Card>
  )
}

export default AuthBox
