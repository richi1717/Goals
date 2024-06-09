import { getDatabase, ref, remove } from 'firebase/database'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const db = getDatabase()

async function deleteGoal(goalId: string, userId?: string) {
  return remove(ref(db, `users/${userId}/goals/${goalId}`))
    .then(() => Promise.resolve(true))
    .catch((error: unknown) => {
      console.error(error)

      return Promise.reject('🤦')
    })
}

export function useDeleteGoal(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: string) => deleteGoal(goalId, userId),
    onMutate: async (goalId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['goals', 'list', { userId }],
      })

      const snapshot = queryClient.getQueryData(['goals', 'list', { userId }])

      queryClient.setQueryData(
        ['goals', 'list', { userId }],
        (previousGoals) => {
          if (previousGoals) {
            const typedGoals: { [key: string]: string | boolean } = {
              ...previousGoals,
            }
            delete typedGoals[goalId]

            return typedGoals
          }
          return previousGoals
        },
      )

      return () => {
        queryClient.setQueryData(['goals', 'list', { userId }], snapshot)
      }
    },
    onError: (_error, _variables, rollback) => {
      rollback?.()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', 'list', { userId }] })
    },
  })
}
