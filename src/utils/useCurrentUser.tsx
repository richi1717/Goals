import { getAuth, User } from 'firebase/auth'
import { useEffect, useState } from 'react'

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    let iteration = 0

    if (!intervalId) {
      intervalId = setInterval(() => {
        const auth = getAuth()

        if (auth.currentUser) {
          setCurrentUser(auth.currentUser)
          clearInterval(intervalId)
        } else {
          if (iteration < 10) {
            console.log('Unauthorized: retry')
            iteration++
          } else {
            console.log('Unauthorized: requires login')
            clearInterval(intervalId)
          }
        }
      }, 150)
    }
  }, [])

  return currentUser
}

export default useCurrentUser
