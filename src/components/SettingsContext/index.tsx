import React, { createContext, useReducer } from 'react'
import { Frequency } from '../../pages/Welcome/components/GoalDisplay'

export const SettingsContext = createContext(null)
export const SettingsDispatchContext =
  createContext<React.Dispatch<any> | null>(null)

export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}

interface Settings {
  filterBy: 'all' | Frequency
  hideComplete: boolean
}

interface Action {
  type: 'updateFilterBy' | 'updateHideComplete'
  filterBy?: 'all' | Frequency
  hideComplete?: boolean
}

function settingsReducer(settings: Settings, action: Action) {
  switch (action.type) {
    case 'updateFilterBy': {
      return {
        ...settings,
        filterBy: action.filterBy,
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

const initialSettings = {
  hideComplete: false,
  filterBy: 'all',
}
