import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import initialize from '../initialize'

initialize()

const auth = getAuth()

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    // Signed in
    const user = userCredential.user
    console.log({ user, userCredential })
    // ...
    return user
  } catch (error: unknown) {
    // const errorCode = error.code
    // const errorMessage = error.message
    console.error(error)
  }
}

export default loginUser
