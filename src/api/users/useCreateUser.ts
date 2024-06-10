import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

initialize()

const auth = getAuth()

interface CreateLogin extends UserLogin {
  displayName: string
}

// export const createUser = async ({ email, password, displayName }: CreateLogin) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     )
//     await updateProfile(userCredential.user, {
//       displayName,
//     })
//     const user = userCredential.user
//     console.log({ userCredential, user })
//   } catch (error: unknown) {
//     // const errorCode = error.code
//     // const errorMessage = error.message
//     console.error(error)
//     // ..
//   }
// }

function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password, displayName }: CreateLogin) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(userCredential.user, {
        displayName,
      })
      return Promise.resolve(userCredential.user)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['goals', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useCreateUser
