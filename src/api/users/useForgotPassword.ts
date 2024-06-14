import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateCommonQueries } from '../utils'

initialize()

const auth = getAuth()

interface ChangePasswordProps {
  email: string
}

export const sendResetEmail = async ({ email }: ChangePasswordProps) => {
  try {
    await sendPasswordResetEmail(auth, email)

    return true
  } catch (error: unknown) {
    console.error(error)
    throw new Error(`Could not send email to ${email}`)
  }
}

function useForgotPassword() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: ({ email }: ChangePasswordProps) => sendResetEmail({ email }),
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useForgotPassword
