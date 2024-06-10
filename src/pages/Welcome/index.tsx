import { Button, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import GoalDisplay from './components/GoalDisplay'
import useGoals from '../../api/goals/useGoals'
import useCreateUser from '../../api/users/useCreateUser'
import useLoginUser from '../../api/users/useLogin'
import updateUser from '../../api/users/updateUser'
import useCurrentUser from '../../api/users/useCurrentUser'
import { SettingsContext } from '../../components/SettingsContext'
import AddGoalFormDialog from './components/AddGoalFormDialog'

function getIt(goals?: Goal[]) {
  const recurringGoals: Goal[] = []
  const singleGoals: Goal[] = []
  goals?.map((goal) =>
    goal.recurring ? recurringGoals.push(goal) : singleGoals.push(goal),
  )
  return { recurringGoals, singleGoals }
}

export default function Welcome() {
  const { data: user } = useCurrentUser()
  const { mutate } = useLoginUser()
  const { data: goals } = useGoals(user?.uid)
  const [open, setOpen] = useState(false)
  const { mutate: createUser } = useCreateUser()
  const { recurringGoals, singleGoals } = getIt(goals)
  console.log({ recurringGoals, singleGoals })

  const { settings } = useContext(SettingsContext)
  const hideComplete = settings?.hideComplete
  const filterBy = settings?.filterBy

  const renderByFiltered = () => {
    if (!goals) return null

    const filteredGoals = goals.filter((goal) =>
      hideComplete ? !goal.completed : true,
    )

    return (
      <Stack direction="row" justifyContent="space-between" width={1}>
        <Stack direction="column" alignItems="flex-start">
          <Typography>Recurring</Typography>
          {recurringGoals.map((goal) => (
            <GoalDisplay key={goal.id} goal={goal} userId={user?.uid} />
          ))}
        </Stack>
        <Stack direction="column" alignItems="flex-start">
          <Typography>Single</Typography>
          {singleGoals.map((goal) => (
            <GoalDisplay key={goal.id} goal={goal} userId={user?.uid} />
          ))}
        </Stack>
      </Stack>
    )

    if (filterBy === 'all') {
      return filteredGoals.map((goal) => (
        <GoalDisplay key={goal.id} goal={goal} userId={user?.uid} />
      ))
    }
    return filteredGoals
      .filter((goal) => goal.frequency === filterBy)
      .map((goal) => (
        <GoalDisplay key={goal.id} goal={goal} userId={user?.uid} />
      ))
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
      <Button onClick={() => setOpen(true)}>Add new</Button>
      <AddGoalFormDialog
        userId={user?.uid}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Stack>
  )
}
