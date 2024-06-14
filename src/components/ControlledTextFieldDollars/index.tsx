import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import React from 'react'

interface ControlledTextFieldDollarsProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string
}

function ControlledTextFieldDollars<T extends FieldValues>({
  name,
  control,
  label,
}: ControlledTextFieldDollarsProps<T>) {
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
          InputProps={{
            inputComponent: NumericFormatCustom as never,
          }}
        />
      )}
    />
  )
}

export default ControlledTextFieldDollars

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        decimalScale={2}
        fixedDecimalScale
        prefix="$"
        thousandSeparator
        valueIsNumericString
        inputMode="decimal"
      />
    )
  },
)
