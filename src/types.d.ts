type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | ''
type Mode = 'dark' | 'light' | 'system'

interface Goal {
  title: string
  level: 'A' | 'B' | 'C'
  completed: boolean
  recurring: boolean
  frequency: Frequency
  id?: string
}

interface Settings {
  filterBy?: 'all' | Frequency
  hideComplete?: boolean
  mode?: Mode
}
