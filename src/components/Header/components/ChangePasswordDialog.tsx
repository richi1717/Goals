import Stack from '@mui/material/Stack'
import Dialog from '../../Dialog'
import useUpdatePassword from '../../../api/users/useUpdatePassword'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import ControlledTextField from '../../ControlledTextField'
import { useState } from 'react'
import { Typography } from '@mui/material'

interface ChangePasswordDialogProps {
  open: boolean
  onClose: () => void
}

export default function ChangePasswordDialog({
  open,
  onClose,
}: ChangePasswordDialogProps) {
  const { mutate, isPending } = useUpdatePassword()
  const theme = useTheme()
  const [hasError, setHasError] = useState(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'))
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (values) => {
    setHasError(false)

    await mutate(
      { newPassword: values.password },
      {
        onSuccess: () => {
          onClose()
          reset()
        },
        onError: () => {
          setHasError(true)
        },
      },
    )
  })

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => {
        onClose()
        reset()
      }}
      isPending={isPending}
      onSubmit={onSubmit}
      buttonText="Login"
      title="Login"
    >
      <Stack spacing={2}>
        {hasError && (
          <Typography color="error">Incorrect email or password</Typography>
        )}
        <ControlledTextField
          name="password"
          control={control}
          type="password"
          label="Password"
        />
        <ControlledTextField
          name="confirmPassword"
          control={control}
          type="password"
          label="Confirm password"
        />
      </Stack>
    </Dialog>
  )
}
