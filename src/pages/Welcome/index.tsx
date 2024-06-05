import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GoalDisplay, { Frequency, Goal } from './components/GoalDisplay'
import { useGoalsQuery } from '../../api/goals/getGoals'
import { useGetUserDataQuery, useGetUsersQuery } from '../../api/goals/getData'
import { createUser } from '../../api/users/createUser'
import loginUser from '../../api/users/loginUser'
import { getAuth } from 'firebase/auth'
import logoutUser from '../../api/users/logoutUser'
import updateUser from '../../api/users/updateUser'
import useCurrentUser from '../../utils/useCurrentUser'
import updateGoals from '../../api/goals/updateGoals'
import { SettingsContext } from '../../components/SettingsContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type Goals = {
  [key: string]: Goal
}

export default function Welcome() {
  const user = useCurrentUser()
  console.log({ user })
  const queryClient = useQueryClient()
  const { data: goals, isLoading, error } = useGoalsQuery(user?.uid)
  // console.log({ data, isLoading, error })
  // console.log(data?.['020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a'])
  // const [goals, setGoals] = useState<Goals>({})
  const [test, setTest] = useState({ cool: { nested: 'test' } })

  const [newGoal, setNewGoal] = useState('')
  // const [filterBy, setFilterBy] = useState<Filter>('all')
  // const [hideComplete, setHideComplete] = useState(false)
  const settings = useContext(SettingsContext)
  const hideComplete = settings?.hideComplete
  const filterBy = settings?.filterBy
  // const storedFilterBy = localStorage.getItem('filterBy')
  // useEffect(() => {
  //   if (data) {
  //     setGoals(data)
  //   }
  // }, [data])
  const handleUpdate = async (goal: Goal, checked: boolean) => {
    // const foundIndex = goals.findIndex((g) => g.id === goal.id)
    // console.log(foundIndex)

    const newGoals = {
      ...goals,
      [uuidv4()]: {
        category: 'long',
        completed: true,
        frequency: 'monthly',
        level: 3,
        title: 'anything',
      },
    }
    // newGoals[foundIndex].completed = checked
    // setGoals(newGoals)
    newGoals[goal.id].completed = checked
    console.log({ goals, goal, newGoals, checked })
    await updateGoals(newGoals)
    console.log('finished', checked)
    queryClient.invalidateQueries({ queryKey: ['goals'] })
    // const newData = await refetch()
    // console.log({ newData: newData?.data })
    // setGoals(newGoals)
    // setThings(`${checked}`)
  }

  const renderByFiltered = () => {
    if (!goals) return null
    const goalArray = Object.keys(goals).map((goal) => ({
      ...goals[goal],
      id: goal,
    }))
    const filteredGoals = goalArray.filter((goal) => {
      // console.log(hideComplete, goal.completed)
      // console.log({ goal })
      return hideComplete ? !goal.completed : true
    })
    // console.log(filteredGoals)

    if (filterBy === 'all') {
      return filteredGoals.map((goal) => (
        <GoalDisplay
          key={goal.id}
          {...goal}
          update={(checked: boolean) => handleUpdate(goal, checked)}
        />
      ))
    }
    return filteredGoals
      .filter((goal) => goal.frequency === filterBy)
      .map((goal) => (
        <GoalDisplay
          key={goal.id}
          {...goal}
          update={(checked: boolean) => handleUpdate(goal, checked)}
        />
      ))
  }

  return (
    <Stack
      direction="column"
      // alignItems="flex-start"
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
      <Button
        onClick={async () => {
          const newGoals = {
            ...goals,
            // [uuidv4()]: {
            //   category: 'short',
            //   completed: true,
            //   frequency: 'yearly',
            //   level: 4,
            //   title: 'test',
            // },
          }
          newGoals['020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a'].completed =
            !goals?.['020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a']?.completed

          newGoals['020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a'].lastUpdate =
            Date.now()
          await updateGoals(newGoals)
          queryClient.invalidateQueries({ queryKey: ['goals'] })
          // handleUpdate(
          //   { id: '020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a' },
          //   !goals?.['020f2d1d-7ab5-4d8f-b3b8-ea90fc115a8a']?.completed,
          // )
        }}
      >
        set test
      </Button>
      <div>
        goal!:{' '}
        {goals?.['1f6c9b4c-7ccc-4bcb-a04f-557c0087e92c']?.completed
          ? 'coolTrue'
          : 'failFalse'}
      </div>
      <Stack spacing={2} alignItems="flex-start" data-testid="all">
        {renderByFiltered()}
      </Stack>
    </Stack>
  )
}
