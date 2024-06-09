import { useQuery, useQueryClient } from '@tanstack/react-query'
import { child, get, getDatabase, ref } from 'firebase/database'

async function fetchGoals(userId?: string) {
  const dbRef = ref(getDatabase())

  try {
    const snapshot = await get(child(dbRef, `users/${userId}/goals/`))

    if (snapshot.exists()) {
      const goals = snapshot.val()

      return Promise.resolve(goals)
    } else {
      console.log('No data available')
    }
    return {}
  } catch (error: unknown) {
    console.error(error)
  }
}

export function useGoals(userId?: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['goals', 'list', { userId }],
    queryFn: () => fetchGoals(userId),
    select: (goals) =>
      Object.keys(goals).map((goal) => ({
        ...goals[goal],
        id: goal,
      })),
    placeholderData: () =>
      queryClient.getQueryData(['goals', 'list', { userId }]),
    staleTime: 10 * 1000,
    enabled: !!userId,
  })
}
