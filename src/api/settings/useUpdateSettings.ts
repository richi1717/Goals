import { getDatabase, ref, update } from 'firebase/database'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import initialize from '../initialize'

initialize()
const db = getDatabase()

async function updateSettings(settings: Settings, userId?: string) {
  return update(ref(db, `users/${userId}/settings`), settings)
    .then(() => Promise.resolve(true))
    .catch((error: unknown) => {
      console.error(error)

      return Promise.reject('🤦')
    })
}

export default function useUpdateSettings(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (settings: Settings) => updateSettings(settings, userId),
    onMutate: async (settings: Settings) => {
      await queryClient.cancelQueries({
        queryKey: ['settings', { userId }],
      })

      const snapshot = queryClient.getQueryData(['settings', { userId }])

      queryClient.setQueryData(['settings', { userId }], (previousSettings) =>
        previousSettings ? settings : previousSettings,
      )

      return () => {
        queryClient.setQueryData(['settings', { userId }], snapshot)
      }
    },
    onError: (_error, _variables, rollback) => {
      rollback?.()
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', { userId }],
      })
    },
  })
}
