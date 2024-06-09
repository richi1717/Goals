import React, { createContext, useReducer } from 'react'
import { Frequency } from '../../pages/Welcome/components/GoalDisplay'

const initialSettings = {
  hideComplete: false,
  filterBy: 'all' as Action['filterBy'],
}

interface SettingsContextProps {
  settings: Settings
  dispatch: React.Dispatch<Action>
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: initialSettings as Settings,
  dispatch: () => {},
})

export function SettingsProvider({ children }: { children?: React.ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

export interface Settings {
  filterBy?: 'all' | Frequency
  hideComplete?: boolean
}

interface Action extends Settings {
  type: 'updateFilterBy' | 'updateHideComplete'
}

function settingsReducer(settings: Settings, action: Action): Settings {
  switch (action.type) {
    case 'updateFilterBy': {
      return {
        ...settings,
        filterBy: action.filterBy!,
      }
    }
    case 'updateHideComplete': {
      return {
        ...settings,
        hideComplete: !settings.hideComplete,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
