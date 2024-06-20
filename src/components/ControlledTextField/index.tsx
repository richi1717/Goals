import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import TextField, {
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material/TextField'

interface ControlledTextFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string
  type?: string
  variant?: TextFieldVariants
  textFieldProps?: TextFieldProps
  required?: boolean
}

function ControlledTextField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  variant = 'outlined',
  textFieldProps,
  required = false,
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
          value={value}
          fullWidth
          label={label}
          variant={variant}
          type={type}
          required={required}
          {...textFieldProps}
          onBlur={(event) => {
            textFieldProps?.onBlur?.(event)
            onBlur()
          }}
        />
      )}
    />
  )
}

export default ControlledTextField
