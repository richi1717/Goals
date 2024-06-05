// import { initializeApp } from 'firebase/app'
import { getDatabase, ref, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// const config = {
//   appName: 'Sunday Class Notes',
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_DB_URL,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
// }

// const app = initializeApp(config)
const db = getDatabase()

interface updateGoalsProps {
  id: string
  chapter: string
  lesson: string
}
// const editLesson = async ({ id, chapter, lesson }: updateGoalsProps) => {
//   await update(ref(db, `goals/${id}`), {
//     [chapter]: lesson,
//   })

//   console.log('looks like we made it!')
// }

// export default editLesson
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// import { getDatabase, ref, update } from 'firebase/database'

const auth = getAuth()
// const db = getDatabase()

async function updateGoals(goals) {
  const user = auth.currentUser

  await update(ref(db, `users/${user?.uid}`), {
    goals,
  })
  Promise.resolve(true)
}

export default updateGoals
