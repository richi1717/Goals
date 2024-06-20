import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import ControlledTextField from '../../components/ControlledTextField'
import { useForm } from 'react-hook-form'
import StyledButton from '../../components/StyledButton'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useChangePassword from '../../api/users/useChangePassword'

export default function ChangePasswordForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSameError, setIsSameError] = useState(false)
  const { mutate: sendUpdatePassword, isError, status } = useChangePassword()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '' },
    mode: 'onTouched',
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)

  const onSubmit = handleSubmit((values) => {
    setIsSameError(false)

    if (values.newPassword === values.currentPassword) {
      setIsSameError(true)
    } else {
      sendUpdatePassword(values, {
        onSuccess: () => {
          navigate('/')
        },
      })
    }
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
            <Typography variant="h4">Change your password</Typography>
            {isError && (
              <Typography color="error">
                Something went wrong, check you password and try again
              </Typography>
            )}
            {isSameError && (
              <Typography color="error">
                New password cannot be the same as the current password
              </Typography>
            )}
            <ControlledTextField
              required
              control={control}
              name="currentPassword"
              label="Current password"
              type={showPassword ? 'text' : 'password'}
              textFieldProps={{
                onBlur: () => setShowPassword(false),
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <ControlledTextField
              required
              control={control}
              name="newPassword"
              label="New password"
              type={showNewPassword ? 'text' : 'password'}
              textFieldProps={{
                onBlur: () => setShowNewPassword(false),
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Stack spacing={2} alignItems="flex-start" width={1}>
            <StyledButton
              type="submit"
              fullWidth
              disabled={!isValid}
              loading={status === 'pending'}
            >
              Change
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}
