import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import useUpdateGoal from '../../../api/goals/useUpdateGoal'
import { grey } from '@mui/material/colors'
import { useMemo, useState } from 'react'
import AddGoalFormDialog from './AddGoalFormDialog'
import { NumericFormat } from 'react-number-format'
import UpdatePaymentDialog from './UpdatePaymentDialog'

interface FinancialGoalProps {
  goal: Goal
  userId?: string
  isEdit?: boolean
}

export default function FinancialGoal({
  goal,
  userId,
  isEdit = false,
}: FinancialGoalProps) {
  const { mutate } = useUpdateGoal(userId)
  const [open, setOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  const percentage = useMemo(() => {
    if (goal.currentAmount && goal.finalAmount) {
      return `${Math.ceil(goal.currentAmount / goal.finalAmount)}%`
    }
  }, [goal?.currentAmount, goal?.finalAmount])

  const letters = () => {
    if (!goal.recurring) return ''
    if (goal.frequency === 'daily') return 'D'
    if (goal.frequency === 'weekly') return 'W'
    if (goal.frequency === 'monthly') return 'M'
    if (goal.frequency === 'yearly') return 'Y'
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
            label={goal.title}
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
          value={goal.title}
          control={
            <Tooltip title="Add payment">
              <IconButton onClick={() => setAddPaymentOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
          label={goal.title}
        />
        <Stack direction="column">
          <Stack
            direction="row"
            sx={{ height: 10, borderRadius: 1, overflow: 'hidden' }}
          >
            <Box
              sx={{
                backgroundColor: 'rgb(51, 255, 0)',
                width: percentage,
              }}
            />
            <Box
              sx={{
                backgroundColor: 'rgba(253, 0, 4, 0.7)',
                flex: 1,
              }}
            />
          </Stack>
          <Stack direction="row">
            <NumericFormat
              displayType="text"
              value={goal.currentAmount}
              decimalScale={2}
              fixedDecimalScale
              prefix="$"
              thousandSeparator=","
            />
            /
            <NumericFormat
              displayType="text"
              value={goal.finalAmount}
              decimalScale={2}
              fixedDecimalScale
              prefix="$"
              thousandSeparator=","
            />
          </Stack>
        </Stack>
      </Stack>
      <UpdatePaymentDialog
        userId={userId}
        open={addPaymentOpen}
        onClose={() => setAddPaymentOpen(false)}
        goal={goal}
      />
    </Stack>
  )
}
