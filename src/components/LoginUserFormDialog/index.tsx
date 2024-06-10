import Stack from '@mui/material/Stack'
import Dialog from '../Dialog'
import useLoginUser from '../../api/users/useLogin'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import ControlledTextField from '../ControlledTextField'
import { useState } from 'react'
import { Typography } from '@mui/material'

interface LoginUserFormDialogProps {
  open: boolean
  onClose: () => void
}

export default function LoginUserFormDialog({
  open,
  onClose,
}: LoginUserFormDialogProps) {
  const { mutate, isPending } = useLoginUser()
  const theme = useTheme()
  const [hasError, setHasError] = useState(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'))
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (values) => {
    setHasError(false)

    await mutate(values, {
      onSuccess: () => {
        onClose()
        reset()
      },
      onError: () => {
        setHasError(true)
      },
    })
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
        <ControlledTextField name="email" control={control} label="Email" />
        <ControlledTextField
          name="password"
          control={control}
          type="password"
          label="Password"
        />
      </Stack>
    </Dialog>
  )
}
