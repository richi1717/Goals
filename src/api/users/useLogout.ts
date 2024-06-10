import { getAuth, signOut } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const auth = getAuth()

      await signOut(auth)
      return Promise.resolve('successfully logged out')
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['goals', 'list'],
      })

      const snapshot = queryClient.getQueryData(['goals', 'list'])

      queryClient.setQueryData(['goals', 'list'], () => ({}))
      queryClient.setQueryData(['user'], () => ({}))

      return () => {
        queryClient.setQueryData(['goals', 'list'], snapshot)
      }
    },
    onError: (_error, _variables, rollback) => {
      rollback?.()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useLogout
