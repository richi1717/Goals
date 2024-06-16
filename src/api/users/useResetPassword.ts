import { confirmPasswordReset, getAuth } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateCommonQueries } from '../utils'

initialize()

const auth = getAuth()

interface ResetPasswordProps {
  oobCode: string
  newPassword: string
}

export const resetPassword = async ({
  oobCode,
  newPassword,
}: ResetPasswordProps) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword)

    return true
  } catch (error: unknown) {
    console.error(error)
    throw new Error('Something went wrong, please try again later')
  }
}

function useResetPassword() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: ({ oobCode, newPassword }: ResetPasswordProps) =>
      resetPassword({ oobCode, newPassword }),
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useResetPassword
