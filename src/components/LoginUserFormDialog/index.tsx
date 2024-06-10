import Stack from '@mui/material/Stack'
import Dialog from '../Dialog'
import useLoginUser from '../../api/users/useLogin'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import ControlledTextField from '../ControlledTextField'

interface LoginUserFormDialogProps {
  open: boolean
  onClose: () => void
}

export default function LoginUserFormDialog({
  open,
  onClose,
}: LoginUserFormDialogProps) {
  const { mutate } = useLoginUser()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'))
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((values) => {
    mutate(values)
    onClose()
    reset()
  })

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => {
        onClose()
        reset()
      }}
      onSubmit={onSubmit}
      buttonText="Login"
      title="Login"
    >
      <Stack spacing={2}>
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
