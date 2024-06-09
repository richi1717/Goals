import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

// async function useLoginUser(email: string, password: string) {
//   return remove(ref(db, `users/${userId}/goals/${goalId}`))
//     .then(() => Promise.resolve(true))
//     .catch((error: unknown) => {
//       console.error(error)

//       return Promise.reject('🤦')
//     })
// }

export function useLoginUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
