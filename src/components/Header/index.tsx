import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material'
import React from 'react'
import Drawer from './components/Drawer'
import { useState } from 'react'
import { deepPurple } from '@mui/material/colors'
import useCurrentUser from '../../api/users/useCurrentUser'
import LoginUserFormDialog from '../LoginUserFormDialog'
import { ColorModeContext } from '../ToggleColorMode'

const getName = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

  const matched = [...name.matchAll(rgx)] || []

  const initials = `${matched.shift()?.[1] || ''}${matched.pop()?.[1] || ''}`

  return initials
}

export default function Header() {
  const { data: user, status } = useCurrentUser()
  const displayName = user?.displayName ?? ''
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const { mode } = React.useContext(ColorModeContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      mt={{ mobile: 8, tablet: 9 }}
    >
      <AppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }} />
            <Stack direction="row" flexGrow={0} alignItems="center">
              {status === 'error' && (
                <Button
                  color={mode === 'light' ? 'inherit' : 'primary'}
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              )}
              <Box sx={{ p: 2 }}>
                <IconButton
                  sx={{
                    textTransform: 'none',
                    p: 0,
                    color: 'common.white',
                  }}
                  onClick={handleClick}
                >
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: { mobile: 30, tablet: 40 },
                      height: { mobile: 30, tablet: 40 },
                    }}
                  >
                    {getName(displayName)}
                  </Avatar>
                </IconButton>
              </Box>
              <Drawer
                anchorEl={anchorEl}
                setAnchorEl={() => setAnchorEl(null)}
                displayName={displayName}
              />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginUserFormDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </Stack>
  )
}
