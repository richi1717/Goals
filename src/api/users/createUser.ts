import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import initialize from '../initialize'

initialize()

export const createUser = async (email: string, password: string) => {
  const auth = getAuth()

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    console.log({ userCredential, user })
  } catch (error: unknown) {
    // const errorCode = error.code
    // const errorMessage = error.message
    console.error(error)
    // ..
  }
}
