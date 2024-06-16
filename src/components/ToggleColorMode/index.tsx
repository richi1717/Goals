import * as React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import useCurrentUser from '../../api/users/useCurrentUser'
import useUpdateSettings from '../../api/settings/useUpdateSettings'

type ColorModeContextProps = {
  mode: Mode
  setColorMode: (mode: Mode) => void
}

export const ColorModeContext = React.createContext<ColorModeContextProps>(
  {} as ColorModeContextProps,
)

function ToggleColorMode() {
  const { mode, setColorMode } = React.useContext(ColorModeContext)
  const { data: user } = useCurrentUser()
  const { mutate } = useUpdateSettings(user?.uid)

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'light' | 'dark' | 'system',
  ) => {
    if (newMode) {
      if (user && JSON.stringify(user) !== '{}') {
        mutate({ mode: newMode })
      }

      document.cookie = `mode=${newMode}`
      setColorMode(newMode)
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ width: 1 }}
    >
      <ToggleButton value="light" sx={{ textTransform: 'none', flex: 1 }}>
        <LightModeIcon sx={{ mr: 1 }} />
        Light
      </ToggleButton>
      <ToggleButton value="system" sx={{ textTransform: 'none', flex: 1 }}>
        <SettingsBrightnessIcon sx={{ mr: 1 }} />
        System
      </ToggleButton>
      <ToggleButton value="dark" sx={{ textTransform: 'none', flex: 1 }}>
        <DarkModeIcon sx={{ mr: 1 }} />
        Dark
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ToggleColorMode
