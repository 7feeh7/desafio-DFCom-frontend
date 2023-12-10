import { Stack } from '@mui/material'
import { ActionButtonProps } from './types_d'
import { RoundedButton } from '../Button/RoundedButton'
export * from './types_d'

function ActionButton({
  resolveMsg = 'Sim',
  rejectMsg = 'Não',
  rejectLoading,
  resolveLoading,
  rejectDisabled,
  resolveDisabled,
  justifyContent = 'flex-end',
  onResolve,
  onReject,
}: ActionButtonProps) {
  return (
    <Stack direction="row" justifyContent={justifyContent} spacing={2}>
      {onReject && (
        <RoundedButton
          sx={{
            background: '#FFF',
            color: '#00929f',
          }}
          variant="outlined"
          onClick={onReject}
          loading={rejectLoading}
          disabled={rejectDisabled}
        >
          {rejectMsg}
        </RoundedButton>
      )}

      {onResolve && (
        <RoundedButton
          sx={{
            background: '#00929f',
            color: '#FFF',
            '&:hover': {
              background: '#00b9c2',
            },
          }}
          onClick={onResolve}
          loading={resolveLoading}
          disabled={resolveDisabled}
        >
          {resolveMsg}
        </RoundedButton>
      )}
    </Stack>
  )
}

export default ActionButton
