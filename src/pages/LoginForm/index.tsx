import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import useLoginUser from '../../api/users/useLoginUser'
// import useForgotPassword from '../../api/users/useForgotPassword'
import ControlledTextField from '../../components/ControlledTextField'
import { useForm } from 'react-hook-form'
import StyledButton from '../../components/StyledButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import { useNavigate } from 'react-router-dom'
import getCookie from '../../utils/getCookie'

export default function LoginForm() {
  const { mutate: loginUser, isError, status } = useLoginUser()
  const emailFromCookie = getCookie()
  const [checked, setChecked] = useState(Boolean(emailFromCookie) ?? false)
  const navigate = useNavigate()
  // const { mutate: sendForgotPassword } = useForgotPassword()
  const loginForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: emailFromCookie ?? '', password: '' },
    mode: 'onTouched',
  })

  useEffect(() => {
    document.cookie = 'beenHereBefore=true'
  }, [])

  const onSubmit = loginForm.handleSubmit((values) => {
    if (checked) {
      document.cookie = `rememberMe=${values.email}`
    }
    loginUser(values, {
      onSuccess: () => {
        loginForm.reset()
        navigate('/goals')
      },
    })
  })

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
      data-testid="loginForm"
      alignItems="center"
    >
      <Card sx={{ p: 1, width: 500 }} component="form" onSubmit={onSubmit}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">
              Welcome{getCookie('beenHereBefore') ? ' back!' : ''}
            </Typography>
            {isError && (
              <Typography color="error">Incorrect email or password</Typography>
            )}
            <ControlledTextField
              control={loginForm.control}
              name="email"
              label="Email"
            />
            <ControlledTextField
              control={loginForm.control}
              name="password"
              label="Password"
              type="password"
            />
            <FormControlLabel
              value="show"
              sx={{ alignSelf: 'flex-start' }}
              control={
                <Checkbox
                  checked={checked}
                  sx={{ ml: -1.5 }}
                  onChange={() => {
                    if (checked) {
                      document.cookie = 'rememberMe='
                    }

                    setChecked(!checked)
                  }}
                />
              }
              label="Remember me"
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Stack spacing={2} alignItems="flex-start" width={1}>
            <StyledButton
              type="submit"
              fullWidth
              disabled={!loginForm.formState.isValid}
              loading={status === 'pending'}
            >
              Sign in
            </StyledButton>
            <StyledButton
              variant="text"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password? <ChevronRightIcon fontSize="small" />
            </StyledButton>
            <StyledButton
              variant="text"
              onClick={() => navigate('/create-account')}
            >
              Not enrolled? Sign up now. <ChevronRightIcon fontSize="small" />
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}
