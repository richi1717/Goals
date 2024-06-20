import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import useCreateUser from '../../api/users/useCreateUser'
import ControlledTextField from '../../components/ControlledTextField'
import { useForm } from 'react-hook-form'
import StyledButton from '../../components/StyledButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import schema from './schema'

export default function CreateAccountForm() {
  const { mutate: createUser, isError } = useCreateUser()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', displayName: '', password: '' },
    mode: 'onTouched',
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const onSubmit = handleSubmit((values) => {
    createUser(values, {
      onSuccess: () => {
        reset()
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
      data-testid="createAccountForm"
      alignItems="center"
    >
      <Card sx={{ p: 1, width: 500 }} component="form" onSubmit={onSubmit}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">Create account</Typography>
            {isError && (
              <Typography color="error">Incorrect email or password</Typography>
            )}
            <ControlledTextField
              control={control}
              name="email"
              label="Email"
              required
            />
            <ControlledTextField
              control={control}
              name="displayName"
              label="Display name"
              required
            />
            <ControlledTextField
              control={control}
              required
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              textFieldProps={{
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
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Stack spacing={2} alignItems="flex-start" width={1}>
            <StyledButton type="submit" fullWidth disabled={!isValid}>
              Create
            </StyledButton>
            <StyledButton variant="text" onClick={() => navigate('/')}>
              Already enrolled? Sign in now.{' '}
              <ChevronRightIcon fontSize="small" />
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}
