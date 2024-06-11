import {
  Checkbox,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import useUpdateGoal from '../../../api/goals/useUpdateGoal'

export default function GoalDisplay({
  goal,
  userId,
}: {
  goal: Goal
  userId?: string
}) {
  const { mutate } = useUpdateGoal(userId)

  const handleChange = async () => {
    const newGoal = { ...goal }
    newGoal.completed = !goal.completed

    mutate(newGoal)
  }

  const letters = () => {
    if (!goal.recurring) return ''
    if (goal.frequency === 'daily') return 'D'
    if (goal.frequency === 'weekly') return 'W'
    if (goal.frequency === 'monthly') return 'M'
    if (goal.frequency === 'yearly') return 'Y'
  }

  return (
    <Stack alignItems="center" spacing={2} data-testid="welcomePage">
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography>{letters()}</Typography>
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
