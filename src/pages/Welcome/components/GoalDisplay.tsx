import { Checkbox, FormControlLabel, Stack, Tooltip } from '@mui/material'
import { updateGoal } from '../../../api/goals/updateGoals'
import { useQueryClient } from '@tanstack/react-query'

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly'
export type Category = 'short' | 'long'

export default function GoalDisplay({ goal }: { goal: Goal }) {
  const queryClient = useQueryClient()

  const handleChange = async () => {
    const newGoal = { ...goal }
    newGoal.completed = !goal.completed

    await updateGoal(newGoal)

    queryClient.invalidateQueries({ queryKey: ['goals'] })
  }

  return (
    <Stack alignItems="center" spacing={2} data-testid="welcomePage">
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <FormControlLabel
          value={goal.title}
          control={
            <Tooltip title="Toggle completed">
              <Checkbox
                checked={goal.completed}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Tooltip>
          }
          label={goal.title}
        />
      </Stack>
    </Stack>
  )
}
