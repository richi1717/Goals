import { useQuery } from '@tanstack/react-query'
import { child, get, getDatabase, ref } from 'firebase/database'

export const useGoalsQuery = (id?: string) => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const dbRef = ref(getDatabase())
      console.log('called it again')
      try {
        const snapshot = await get(child(dbRef, `users/${id}/goals/`))

        if (snapshot.exists()) {
          console.log(snapshot.val())
          return Promise.resolve(snapshot.val())
        } else {
          console.log('No data available')
        }
        return {}
      } catch (error: unknown) {
        console.error(error)
      }
    },
    enabled: !!id,
  })
}
