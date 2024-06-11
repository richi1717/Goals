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

function useGoals(userId?: string) {
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
// if (a is less than b by some ordering criterion) {
//     return -1;
//   } else if (a is greater than b by the ordering criterion) {
//     return 1;
//   }
// a must be equal to b
// return 0

export default useGoals
