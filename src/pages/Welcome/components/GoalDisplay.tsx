import {
  Checkbox,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
// import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly'
export type Category = 'short' | 'long'

export type Goal = {
  title: string
  level: number
  completed: boolean
  category: Category
  frequency: Frequency
  id: string
}

interface GoalProps extends Goal {
  update: (checked: boolean) => void
}

export default function GoalDisplay({
  title,
  // level,
  // category,
  // frequency,
  // id,
  completed,
  update,
}: GoalProps) {
  // const [newGoal, setNewGoal] = useState('')
  // const [goals, setGoals] = useState<GoalProps[]>(defaultGoals)

  const handleChange = () => {
    update(!completed)
  }

  return (
    <Stack alignItems="center" spacing={2} data-testid="welcomePage">
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <FormControlLabel
          value={title}
          control={
            <Tooltip title="Toggle completed">
              <Checkbox
                checked={completed}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Tooltip>
          }
          label={title}
        />
      </Stack>
    </Stack>
  )
}
