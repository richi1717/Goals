import { getAuth, updateProfile } from 'firebase/auth'
import { getDatabase, ref, update } from 'firebase/database'

const auth = getAuth()
const db = getDatabase()

async function updateUser(displayName: string) {
  const user = auth.currentUser

  if (user) {
    await updateProfile(user, {
      displayName,
    })
  }

  update(ref(db, `users/${user?.uid}`), {
    displayName,
    email: user?.email,
  })
}

export default updateUser
