import { Button, Stack } from '@mui/material'
import { useContext } from 'react'
import GoalDisplay from './components/GoalDisplay'
import { useGoalsQuery } from '../../api/goals/getGoals'
import { createUser } from '../../api/users/createUser'
import loginUser from '../../api/users/loginUser'
import { getAuth } from 'firebase/auth'
import logoutUser from '../../api/users/logoutUser'
import updateUser from '../../api/users/updateUser'
import useCurrentUser from '../../utils/useCurrentUser'
import { SettingsContext } from '../../components/SettingsContext'

export default function Welcome() {
  const user = useCurrentUser()
  // console.log({ user })
  const { data: goals } = useGoalsQuery(user?.uid)

  // const [newGoal, setNewGoal] = useState('')
  const settings = useContext(SettingsContext)
  const hideComplete = settings?.hideComplete
  const filterBy = settings?.filterBy

  const renderByFiltered = () => {
    if (!goals) return null

    const filteredGoals = goals.filter((goal) =>
      hideComplete ? !goal.completed : true,
    )

    if (filterBy === 'all') {
      return filteredGoals.map((goal) => (
        <GoalDisplay key={goal.id} goal={goal} />
      ))
    }
    return filteredGoals
      .filter((goal) => goal.frequency === filterBy)
      .map((goal) => <GoalDisplay key={goal.id} goal={goal} />)
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
          createUser('kikki_sawn@yahoo.com', 'Password1717!')
        }}
      >
        create
      </Button>
      <Button
        onClick={() => {
          loginUser('kikki_sawn@yahoo.com', 'Password1717!')
        }}
      >
        login user
      </Button>
      <Button
        onClick={() => {
          const { currentUser } = getAuth()
          console.log(currentUser)
        }}
      >
        get auth
      </Button>
      <Button
        onClick={() => {
          logoutUser()
        }}
      >
        logout
      </Button>
      <Button
        onClick={() => {
          updateUser('Greatest Ever')
        }}
      >
        update
      </Button>
      {/* <div>
        goal!:{' '}
        {goals?.find(
          (goal) => goal.id === '1f6c9b4c-7ccc-4bcb-a04f-557c0087e92c',
        )?.completed
          ? 'coolTrue'
          : 'failFalse'}
      </div> */}
      <Stack spacing={2} alignItems="flex-start" data-testid="all">
        {renderByFiltered()}
      </Stack>
    </Stack>
  )
}
