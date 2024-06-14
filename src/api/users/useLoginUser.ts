import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

initialize()

const auth = getAuth()

interface UserLoginProps extends UserLogin {
  verified?: boolean
}

export const loginUser = async ({
  email,
  password,
  verified,
}: UserLoginProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    if (verified) {
      await updateProfile(user, {
        emailVerified: true,
      })
    }

    return user
  } catch (error: unknown) {
    // const errorCode = error.code
    console.log('was it here?')
    // const errorMessage = error.message
    console.error(error)
    throw new Error('Unauthorized: incorrect email or password')
  }
}

function useLoginUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password, verified }: UserLoginProps) =>
      loginUser({ email, password, verified }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['goals', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useLoginUser
