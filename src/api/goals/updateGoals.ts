import { getDatabase, ref, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'
const db = getDatabase()

const auth = getAuth()

export async function updateGoal(goal: Goal) {
  const user = auth.currentUser
  const { id, ...newGoal } = goal

  update(ref(db, `users/${user?.uid}/goals/${id}`), {
    ...newGoal,
  })
    .then(() => Promise.resolve(true))
    .catch((error: unknown) => {
      console.error(error)

      return Promise.reject('🤦')
    })
}
