import * as React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Dialog from '../Dialog'
import useLoginUser from '../../api/users/useLogin'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

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

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const items = new FormData(event.currentTarget)
        mutate({
          email: items.get('email') as string,
          password: items.get('password') as string,
        })
        onClose()
      }}
      buttonText="Login"
      title="Login"
    >
      <Stack spacing={2}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
        />
      </Stack>
    </Dialog>
  )
}
