import { Button, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import GoalDisplay from './components/GoalDisplay'
import useGoals from '../../api/goals/useGoals'
import useCreateUser from '../../api/users/useCreateUser'
import useLoginUser from '../../api/users/useLoginUser'
import updateUser from '../../api/users/updateUser'
import useCurrentUser from '../../api/users/useCurrentUser'
import { SettingsContext } from '../../components/SettingsContext'
import AddGoalFormDialog from './components/AddGoalFormDialog'
import { sortFrequency } from './utils'
import { useNavigate } from 'react-router-dom'

function separateByRecurring(goals?: Goal[]) {
  const recurringGoals: Goal[] = []
  const singleGoals: Goal[] = []
  goals?.map((goal) =>
    goal.recurring ? recurringGoals.push(goal) : singleGoals.push(goal),
  )
  return { recurringGoals, singleGoals }
}

export default function Goals() {
  const { data: user, isError } = useCurrentUser()
  const navigate = useNavigate()
  const { mutate } = useLoginUser()
  const { data: goals } = useGoals(user?.uid)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const { mutate: createUser } = useCreateUser()
  const { settings } = useContext(SettingsContext)
  const hideComplete = settings?.hideComplete
  const filterBy = settings?.filterBy

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
  }, [isError, navigate])

  const filteredGoals = useMemo(
    () => goals?.filter((goal) => (hideComplete ? !goal.completed : true)),
    [goals, hideComplete],
  )

  const { recurringGoals, singleGoals } = useMemo(
    () => separateByRecurring(filteredGoals),
    [filteredGoals],
  )

  const renderByFiltered = () => {
    if (!goals) return null

    if (filterBy === 'all') {
      return (
        <Stack direction="row" justifyContent="space-between" width={1}>
          <Stack direction="column" alignItems="flex-start">
            <Typography>Recurring</Typography>
            {recurringGoals.sort(sortFrequency).map((goal) => (
              <GoalDisplay
                isEdit={editOpen}
                key={goal.id}
                goal={goal}
                userId={user?.uid}
              />
            ))}
          </Stack>
          <Stack direction="column" alignItems="flex-start">
            <Typography>Single</Typography>
            {singleGoals.map((goal) => (
              <GoalDisplay
                isEdit={editOpen}
                key={goal.id}
                goal={goal}
                userId={user?.uid}
              />
            ))}
          </Stack>
        </Stack>
      )
    }

    return (
      <Stack direction="row" justifyContent="space-between" width={1}>
        <Stack direction="column" alignItems="flex-start">
          <Typography>Recurring</Typography>
          {recurringGoals
            .filter((goal) => goal.frequency === filterBy)
            .sort(sortFrequency)
            .map((goal) => (
              <GoalDisplay
                isEdit={editOpen}
                key={goal.id}
                goal={goal}
                userId={user?.uid}
              />
            ))}
        </Stack>
        <Stack direction="column" alignItems="flex-start">
          <Typography>Single</Typography>
          {singleGoals.map((goal) => (
            <GoalDisplay
              isEdit={editOpen}
              key={goal.id}
              goal={goal}
              userId={user?.uid}
            />
          ))}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
      direction="column"
      sx={{
        py: { mobile: 1, tablet: 4 },
        px: { mobile: 3, tablet: 4 },
        maxWidth: 'desktop',
        width: 1,
      }}
      spacing={1}
      data-testid="welcomePage"
    >
      <Button onClick={() => setOpen(true)}>Add new</Button>
      <Button onClick={() => setEditOpen(!editOpen)}>
        {editOpen ? 'Finish editing' : 'Edit'} goals
      </Button>
      <Button
        onClick={() => {
          createUser({
            email: 'richi1717@gmail.com',
            password: 'Password1717!',
            displayName: 'Deku',
          })
        }}
      >
        create
      </Button>
      <Button
        onClick={() => {
          mutate({ email: 'kikki_sawn@yahoo.com', password: 'Password1717!' })
        }}
      >
        login user
      </Button>
      <Button
        onClick={() => {
          updateUser('Eraser head')
        }}
      >
        update
      </Button>
      <Stack spacing={2} alignItems="flex-start" data-testid="all">
        {renderByFiltered()}
      </Stack>
      <AddGoalFormDialog
        userId={user?.uid}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Stack>
  )
}
