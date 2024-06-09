type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | ''

interface Goal {
  title: string
  level: 'A' | 'B' | 'C'
  completed: boolean
  recurring: boolean
  frequency: Frequency
  id?: string
}
