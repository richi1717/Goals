import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth'
import initialize from '../initialize'
import { useMutation } from '@tanstack/react-query'
import useLogout from './useLogout'

initialize()

const auth = getAuth()

interface ChangePasswordProps {
  currentPassword: string
  newPassword: string
}

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordProps) => {
  try {
    const user = auth.currentUser

    if (user?.email) {
      await signInWithEmailAndPassword(auth, user.email, currentPassword)

      await updatePassword(user!, newPassword)
    } else {
      throw new Error('Not currently logged')
    }

    return user
  } catch (error: unknown) {
    // const errorCode = error.code
    // const errorMessage = error.message
    console.error(error)
    throw new Error('Encountered an issue')
  }
}

function useChangePassword() {
  const { mutate: logout } = useLogout()

  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordProps) =>
      changePassword({ currentPassword, newPassword }),
    onSuccess: async () => {
      await logout()
    },
  })
}

export default useChangePassword
