import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material'
// import { deepPurple } from '@mui/material/colors'
// import Avatar from '@mui/material/Avatar'
// import { useTheme } from '@mui/material/styles'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from './components/Drawer'
import { useState } from 'react'
import { deepPurple } from '@mui/material/colors'
import useCurrentUser from '../../utils/useCurrentUser'

// interface HeaderProps {
// }

const getName = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

  const matched = [...name.matchAll(rgx)] || []

  const initials = `${matched.shift()?.[1] || ''}${matched.pop()?.[1] || ''}`

  return initials
}

export default function Header() {
  const currentUser = useCurrentUser()
  const displayName = currentUser?.displayName ?? ''
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
            <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
              {/* <IconButton LinkComponent={RouterLink} href="/">
                <ChurchOutlinedIcon sx={{ color: 'common.white' }} />
              </IconButton>
              <Button
                sx={{
                  textTransform: 'none',
                  p: 2,
                  color: 'common.white',
                }}
                onClick={() => console.log('doing good')}
              >
                Book & Chapter
              </Button> */}
            </Stack>
            <Stack direction="row" flexGrow={0}>
              <IconButton
                sx={{
                  textTransform: 'none',
                  p: 2,
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
              <Drawer
                anchorEl={anchorEl}
                setAnchorEl={() => setAnchorEl(null)}
                displayName={displayName}
              />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Stack>
  )
}
