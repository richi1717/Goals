import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

initialize()

const auth = getAuth()

interface ChangePasswordProps {
  newPassword: string
}

export const changePassword = async ({ newPassword }: ChangePasswordProps) => {
  try {
    const user = auth.currentUser
    // await updatePassword(user!, newPassword)

    // test to send email to reset!
    await sendPasswordResetEmail(auth, 'kikki_sawn@yahoo.com')

    return user
  } catch (error: unknown) {
    // const errorCode = error.code
    // const errorMessage = error.message
    console.error(error)
    throw new Error('Encountered an issue')
  }
}

function useUpdatePassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ newPassword }: ChangePasswordProps) =>
      changePassword({ newPassword }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['goals', 'list'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useUpdatePassword
