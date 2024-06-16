import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import useForgotPassword from '../../api/users/useForgotPassword'
import ControlledTextField from '../../components/ControlledTextField'
import { useForm } from 'react-hook-form'
import StyledButton from '../../components/StyledButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import getCookie from '../../utils/getCookie'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordForm() {
  const emailFromCookie = getCookie()
  const navigate = useNavigate()
  const { mutate: sendForgotPassword, isError, status } = useForgotPassword()
  const loginForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: emailFromCookie ?? '' },
    mode: 'onTouched',
  })

  const onSubmit = loginForm.handleSubmit((values) => {
    sendForgotPassword(values)
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
            <Typography variant="h4">Reset your password</Typography>
            <Typography>Please enter your email address</Typography>
            {isError && (
              <Typography color="error">
                Something went wrong, please check your email and try again
                later
              </Typography>
            )}
            <ControlledTextField
              control={loginForm.control}
              name="email"
              label="Email"
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Stack spacing={2} alignItems="flex-start" width={1}>
            {status === 'success' && (
              <StyledButton variant="text" onClick={onSubmit}>
                Didn't receive an email yet? Resend.
              </StyledButton>
            )}
            <StyledButton
              type="submit"
              fullWidth
              disabled={!loginForm.formState.isValid}
              loading={status === 'pending'}
            >
              Send email
            </StyledButton>
            <StyledButton variant="text" onClick={() => navigate('/')}>
              Remembered? Sign in now. <ChevronRightIcon fontSize="small" />
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}
