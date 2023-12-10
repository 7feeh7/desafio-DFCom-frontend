import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { styled } from '@mui/material'

export type CustomTextFieldProps = {
  control?: Control<FieldValues>
  rounded?: boolean
} & TextFieldProps

export const RoundedTextField = styled(MuiTextField)<CustomTextFieldProps>(
  ({ rounded = true }) => ({
    fieldset: {
      borderRadius: rounded && 50,
    },
  }),
)

function TextField({
  name,
  defaultValue,
  control,
  ...rest
}: CustomTextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <RoundedTextField
          {...field}
          {...rest}
          size="small"
          fullWidth
          error={invalid}
          helperText={error?.message}
          defaultValue={defaultValue}
        />
      )}
    />
  )
}

export default TextField
