import { getAuth, signOut } from 'firebase/auth'
import initialize from '../initialize'

initialize()

const auth = getAuth()

const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (err: unknown) {
    console.error(err)
  }
}

export default logoutUser
