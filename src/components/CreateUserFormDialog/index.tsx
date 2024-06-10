// import * as React from 'react'
import Stack from '@mui/material/Stack'
import Dialog from '../Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
// import { Controller, useForm } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import ControlledTextField from '../ControlledTextField'
// import {
//   FormControl,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
// } from '@mui/material'
// import Visibility from '@mui/icons-material/Visibility'
// import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useCreateUser from '../../api/users/useCreateUser'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'

interface CreateUserFormDialogProps {
  open: boolean
  onClose: () => void
}

export default function CreateUserFormDialog({
  open,
  onClose,
}: CreateUserFormDialogProps) {
  const { mutate } = useCreateUser()
  const theme = useTheme()
  // const [showPassword, setShowPassword] = React.useState(false)
  // const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'))
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  // const handleClickShowPassword = () => setShowPassword((show) => !show)

  const onSubmit = handleSubmit((values) => {
    mutate({
      email: values.email,
      password: values.password,
      displayName: `${values.firstName} ${values.lastName}`,
    })
    onClose()
  })

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => {
        reset()
        onClose()
      }}
      onSubmit={onSubmit}
      buttonText="Create"
      title="Create"
    >
      <Stack spacing={2}>
        <ControlledTextField
          name="firstName"
          label="First name"
          control={control}
        />
        <ControlledTextField
          name="lastName"
          label="Last name"
          control={control}
        />
        <ControlledTextField name="email" label="Email" control={control} />
        <ControlledTextField
          name="password"
          label="Password"
          control={control}
          type="password"
        />
        <ControlledTextField
          name="confirmPassword"
          label="Confirm password"
          control={control}
          type="password"
        />
        {/* <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl
              error={error?.message ? true : false}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                onBlur={() => setShowPassword(false)}
                value={value}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl
              error={error?.message ? true : false}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={onChange}
                onBlur={() => setShowConfirmPassword(false)}
                value={value}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
              />
              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        /> */}
      </Stack>
    </Dialog>
  )
}
