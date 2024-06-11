import { getDatabase, ref, update, serverTimestamp } from 'firebase/database'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const db = getDatabase()

async function updateGoal(goal: Goal, userId?: string) {
  const { id, ...newGoal } = goal

  return update(ref(db, `users/${userId}/goals/${id}`), {
    ...newGoal,
    lastUpdate: serverTimestamp(),
  })
    .then(() => Promise.resolve(true))
    .catch((error: unknown) => {
      console.error(error)

      return Promise.reject('🤦')
    })
}

export default function useUpdateGoal(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goal: Goal) => updateGoal(goal, userId),
    onMutate: async ({ id, ...goal }: Goal) => {
      await queryClient.cancelQueries({
        queryKey: ['goals', 'list', { userId }],
      })

      const snapshot = queryClient.getQueryData(['goals', 'list', { userId }])

      queryClient.setQueryData(
        ['goals', 'list', { userId }],
        (previousGoals) =>
          previousGoals
            ? { ...previousGoals, [id as string]: goal }
            : previousGoals,
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
