import * as React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '../../../components/Dialog'
import useAddGoal from '../../../api/goals/useAddGoal'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'

interface AddGoalFormDialogProps {
  userId?: string
  open: boolean
  onClose: () => void
}

const initialGoal: Goal = {
  recurring: false,
  completed: false,
  frequency: '',
  level: 'A',
  title: '',
}

export default function AddGoalFormDialog({
  userId,
  open,
  onClose,
}: AddGoalFormDialogProps) {
  const [newGoal, setNewGoal] = React.useState<Goal>(initialGoal)
  const { mutate } = useAddGoal(userId)

  return (
    <Dialog
      title="Add Goal"
      open={open}
      onClose={() => {
        onClose()
        setNewGoal(initialGoal)
      }}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(
          {
            ...newGoal,
            frequency: newGoal.recurring ? newGoal.frequency : '',
          },
          { onSuccess: () => setNewGoal(initialGoal) },
        )
        onClose()
      }}
      buttonText="Add"
    >
      <Stack spacing={2} sx={{ pt: 2 }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="goal"
          name="goal"
          label="Goal"
          type="goal"
          fullWidth
          variant="outlined"
          value={newGoal.title}
          onChange={(event) => {
            setNewGoal({ ...newGoal, title: event.target.value })
          }}
        />
        {newGoal.recurring && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newGoal.frequency}
              label="Frequency"
              onChange={(event: SelectChangeEvent) => {
                setNewGoal({
                  ...newGoal,
                  frequency: event.target.value as Frequency,
                })
              }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newGoal.level}
            label="Level"
            onChange={(event: SelectChangeEvent) => {
              setNewGoal({
                ...newGoal,
                level: event.target.value as 'A' | 'B' | 'C',
              })
            }}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={newGoal.recurring}
                onChange={() =>
                  setNewGoal({ ...newGoal, recurring: !newGoal.recurring })
                }
              />
            }
            label="Make recurring"
          />
        </Stack>
      </Stack>
    </Dialog>
  )
}
