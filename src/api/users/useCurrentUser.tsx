import { useQuery } from '@tanstack/react-query'
import { getAuth } from 'firebase/auth'

function useCurrentUser() {
  return useQuery({
    queryKey: ['user'],
    retryDelay: 100,
    retry: 10,
    queryFn: async () => {
      const auth = await getAuth()

      if (auth?.currentUser) {
        return Promise.resolve(auth?.currentUser)
      }

      return Promise.reject('Unauthorized')
    },
  })
}

export default useCurrentUser
