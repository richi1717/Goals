import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
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

export default function AddGoalFormDialog({ userId }: { userId?: string }) {
  const [open, setOpen] = React.useState(false)
  const [newGoal, setNewGoal] = React.useState<Goal>({
    recurring: false,
    completed: false,
    frequency: '',
    level: 'A',
    title: '',
  })
  const { mutate } = useAddGoal(userId)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            mutate({
              ...newGoal,
              frequency: newGoal.recurring ? '' : newGoal.frequency,
            })
            handleClose()
          },
        }}
      >
        <DialogTitle>Add Goal</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
