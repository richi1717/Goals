import * as React from 'react'
import Dialog from '../../../components/Dialog'
import { Stack } from '@mui/material'
import useUpdateGoal from '../../../api/goals/useUpdateGoal'
import ControlledTextFieldDollars from '../../../components/ControlledTextFieldDollars'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'

interface UpdatePaymentDialogProps {
  userId?: string
  open: boolean
  onClose: () => void
  goal: Goal
}

const initialGoal: Goal = {
  recurring: false,
  completed: false,
  frequency: '',
  level: 'A',
  title: '',
}

export default function UpdatePaymentDialog({
  userId,
  open,
  onClose,
  goal,
}: UpdatePaymentDialogProps) {
  const [newGoal, setNewGoal] = React.useState<Goal>(goal)
  const { mutate } = useUpdateGoal(userId)
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: { amount: 0 },
  })

  return (
    <Dialog
      title={goal ? 'Edit goal' : 'Add goal'}
      open={open}
      onClose={() => {
        onClose()
        setNewGoal(initialGoal)
      }}
      onSubmit={handleSubmit((values) => {
        mutate(
          {
            ...newGoal,
            currentAmount: goal.currentAmount! + values.amount,
          },
          { onSuccess: () => setNewGoal(initialGoal) },
        )
        onClose()
      })}
      buttonText={goal ? 'Edit' : 'Add'}
    >
      <Stack spacing={2} sx={{ pt: 2 }}>
        <ControlledTextFieldDollars
          control={control}
          label="Amount"
          name="amount"
        />
      </Stack>
    </Dialog>
  )
}
