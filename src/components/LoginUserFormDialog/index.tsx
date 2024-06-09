import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useLoginUser } from '../../api/users/loginUser'

interface LoginUserFormDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function LoginUserFormDialog({
  open,
  setOpen,
}: LoginUserFormDialogProps) {
  const { mutate } = useLoginUser()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const items = new FormData(event.currentTarget)
          mutate({
            email: items.get('email') as string,
            password: items.get('password') as string,
          })
          handleClose()
        },
      }}
    >
      <DialogTitle>Add Goal</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 2 }}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Login</Button>
      </DialogActions>
    </Dialog>
  )
}
