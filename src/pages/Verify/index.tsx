import { Button, Stack, Typography } from '@mui/material'
import useCreateUser from '../../api/users/useCreateUser'
import useLoginUser from '../../api/users/useLoginUser'
import updateUser from '../../api/users/updateUser'
import useCurrentUser from '../../api/users/useCurrentUser'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export default function Verify() {
  const [queryParams] = useSearchParams()
  console.log({ queryParams })
  const oobCode = queryParams.get('oobCode')
  const mode = queryParams.get('mode')
  console.log({ oobCode, mode })
  const { data: user } = useCurrentUser()
  const { mutate } = useLoginUser()
  const { mutate: createUser } = useCreateUser()

  const title = useMemo(() => {
    switch (mode) {
      case 'resetPassword':
        return 'Please create a new password'
      case 'verifyEmail':
        return 'Please login to verify your email'
      default:
        'Failure but we can make it work'
    }
  }, [mode])

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
      <Typography>{title}</Typography>
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
          mutate({
            email: 'kikki_sawn@yahoo.com',
            password: 'Password1717!',
            verified: true,
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
