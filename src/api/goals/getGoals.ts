import { useQuery } from '@tanstack/react-query'
import { child, get, getDatabase, ref } from 'firebase/database'

export const useGoalsQuery = (id?: string) => {
  return useQuery({
    queryKey: ['goals', id],
    queryFn: async () => {
      const dbRef = ref(getDatabase())

      try {
        const snapshot = await get(child(dbRef, `users/${id}/goals/`))

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
    },
    select: (goals) =>
      Object.keys(goals).map((goal) => ({
        ...goals[goal],
        id: goal,
      })),
    enabled: !!id,
  })
}
