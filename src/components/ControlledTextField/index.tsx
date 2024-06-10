import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface ControlledTextFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string
  type?: string
}

function ControlledTextField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error?.message ?? null}
          error={!!error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type}
        />
      )}
    />
  )
}

export default ControlledTextField
