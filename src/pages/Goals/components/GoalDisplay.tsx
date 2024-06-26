import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import useUpdateGoal from '../../../api/goals/useUpdateGoal'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import AddGoalFormDialog from './AddGoalFormDialog'
import FinancialGoal from './FinancialGoal'

interface GoalDisplayProps {
  goal: Goal
  userId?: string
  isEdit?: boolean
}

export default function GoalDisplay({
  goal,
  userId,
  isEdit = false,
}: GoalDisplayProps) {
  const { mutate } = useUpdateGoal(userId)
  const [open, setOpen] = useState(false)

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

  if (goal.financial && goal.currentAmount && goal.finalAmount) {
    return <FinancialGoal goal={goal} isEdit={isEdit} userId={userId} />
  }

  function truncateString(str: string) {
    return str.length > 25 ? `${str.slice(0, 22)}...` : str
  }

  if (isEdit) {
    return (
      <Stack alignItems="center" spacing={2} data-testid="goalDisplay">
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <FormControlLabel
            label={truncateString(goal.title)}
            sx={{
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: grey[500],
                },
              },
            }}
            control={
              <IconButton onClick={() => setOpen(true)}>
                <EditIcon sx={{ color: grey[300] }} />
              </IconButton>
            }
          />
        </Stack>
        <AddGoalFormDialog
          open={open}
          onClose={() => setOpen(false)}
          existingGoal={goal}
          userId={userId}
        />
      </Stack>
    )
  }

  return (
    <Stack alignItems="center" spacing={2} data-testid="goalDisplay">
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography>{letters()}</Typography>
        <FormControlLabel
          value={truncateString(goal.title)}
          control={
            <Checkbox
              checked={goal.completed}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'goal-completion-toggle' }}
            />
          }
          label={truncateString(goal.title)}
        />
      </Stack>
    </Stack>
  )
}
