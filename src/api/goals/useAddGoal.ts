import { getDatabase, ref, push, serverTimestamp } from 'firebase/database'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const db = getDatabase()

async function addGoal(goal: Goal, userId?: string) {
  return push(ref(db, `users/${userId}/goals`), {
    ...goal,
    created: serverTimestamp(),
  })
    .then(() => Promise.resolve(true))
    .catch((error: unknown) => {
      console.error(error)

      return Promise.reject('🤦')
    })
}

export default function useAddGoal(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goal: Goal) => addGoal(goal, userId),
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
