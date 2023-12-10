import { StackProps } from '@mui/system'

export interface ActionButtonBaseProps {
  resolveMsg?: string
  rejectMsg?: string
  rejectDisabled?: boolean
  resolveDisabled?: boolean
  rejectLoading?: boolean
  resolveLoading?: boolean
  onResolve?: () => void
  onReject?: () => void
}
export interface ActionButtonProps extends StackProps, ActionButtonBaseProps {}
