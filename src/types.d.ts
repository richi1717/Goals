type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | ''
type Mode = 'dark' | 'light' | 'system'

interface Goal {
  title: string
  level: 'A' | 'B' | 'C'
  completed: boolean
  recurring: boolean
  frequency: Frequency
  id?: string
  lastUpdate?: number
  created?: number
}

interface Settings {
  filterBy?: 'all' | Frequency
  hideComplete?: boolean
  mode?: Mode
}

interface UserLogin {
  email: string
  password: string
}
