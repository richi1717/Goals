import { useQuery, useQueryClient } from '@tanstack/react-query'
import { child, get, getDatabase, ref } from 'firebase/database'

async function fetchSettings(userId?: string) {
  const dbRef = ref(getDatabase())

  try {
    const snapshot = await get(child(dbRef, `users/${userId}/settings/`))

    if (snapshot.exists()) {
      const settings = snapshot.val()

      return Promise.resolve(settings)
    } else {
      console.log('No data available')
    }
    return {}
  } catch (error: unknown) {
    console.error(error)
  }
}

function useUserSettings(userId?: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['settings', { userId }],
    queryFn: () => fetchSettings(userId),
    placeholderData: () => queryClient.getQueryData(['settings', { userId }]),
    staleTime: 10 * 1000,
    enabled: !!userId,
  })
}

export default useUserSettings
