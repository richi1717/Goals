import React, { useCallback } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Stack, useMediaQuery } from '@mui/material'
import myTheme from './theme'
import { ColorModeContext } from './components/ToggleColorMode'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import '@fontsource/roboto'
import { SettingsProvider } from './components/SettingsContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useCurrentUser from './api/users/useCurrentUser'
import useUserSettings from './api/settings/useUserSettings'

function App() {
  const { data: user } = useCurrentUser()
  const { data: userSettings } = useUserSettings(user?.uid)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<Mode>(
    prefersDarkMode ? 'dark' : 'light',
  )
  const userMode = React.useMemo(
    () => userSettings?.mode ?? mode,
    [userSettings?.mode, mode],
  )

  const setColorMode = useCallback((mode: Mode) => setMode(mode), [setMode])

  const contextValue = React.useMemo(
    () => ({ mode: userMode, setColorMode }),
    [setColorMode, userMode],
  )
  const theme = React.useMemo(() => {
    if (userMode === 'system') {
      return myTheme(prefersDarkMode ? 'dark' : 'light')
    }

    return myTheme(userMode)
  }, [userMode, prefersDarkMode])

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <SettingsProvider>
          <CssBaseline />
          <Stack sx={{ width: '100vw', height: '100vh' }} data-testid="yaaa">
            <RouterProvider router={Router} />
          </Stack>
          <ReactQueryDevtools initialIsOpen={false} />
        </SettingsProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
