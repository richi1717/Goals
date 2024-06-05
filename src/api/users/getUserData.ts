import { getAuth } from 'firebase/auth'
import initialize from '../initialize'

initialize()

export const useGetUserInfo = () => {
  const auth = getAuth()
  const user = auth.currentUser
  console.log({ user }, 'repeat'.repeat(20))
  if (user) {
    return { displayName: user.displayName }
  }
}
