import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import useCreateUser from '../../api/users/useCreateUser'
import useLoginUser from '../../api/users/useLoginUser'
import updateUser from '../../api/users/updateUser'
import useForgotPassword from '../../api/users/useForgotPassword'

export default function Welcome() {
  const { mutate: loginUser } = useLoginUser()
  const { mutate: sendForgotPassword } = useForgotPassword()

  const [open, setOpen] = useState(false)
  const { mutate: createUser } = useCreateUser()

  return (
    <Stack
      direction="column"
      sx={{
        py: { mobile: 1, tablet: 4 },
        px: { mobile: 3, tablet: 4 },
        maxWidth: 'desktop',
        width: 1,
      }}
      spacing={1}
      data-testid="welcomePage"
    >
      <Button onClick={() => setOpen(true)}>Add new</Button>
      <Button
        onClick={() => {
          createUser({
            email: 'richi1717@gmail.com',
            password: 'Password1717!',
            displayName: 'Deku',
          })
        }}
      >
        create
      </Button>
      <Button
        onClick={() => {
          loginUser({
            email: 'kikki_sawn@yahoo.com',
            password: 'Password1717!',
          })
        }}
      >
        login user
      </Button>
      <Button
        onClick={() => {
          updateUser('Eraser head')
        }}
      >
        update
      </Button>
      <Stack spacing={2} alignItems="flex-start" data-testid="all"></Stack>
    </Stack>
  )
}
