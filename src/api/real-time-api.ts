import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { EventType } from 'firebase/database'

// This value is the default 403 code from firebase
const PERMISSION_DENIED_STATUS_CODE = 'PERMISSION_DENIED'

export interface RealTimeFetchParams {
  path: string
}

export interface RealTimeSubscribeParams<T> {
  path: string
  event?: EventType
  callback: (value: T) => void
}

export interface RealTimeUnsubscribeParams {
  path: string
  event?: EventType
}

export class RealTimeApi {
  private firebase: firebase.app.App

  constructor() {
    this.handleAuthenticationErrors = this.handleAuthenticationErrors.bind(this)

    this.firebase = firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    })
  }

  private handleAuthenticationErrors(error: firebase.FirebaseError) {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle logout any way you want. For example, if you were using
      // AWS Cognito, you'd call `Auth.logout()`
    }
  }

  public connect(token: string) {
    return this.firebase.auth().signInWithCustomToken(token)
  }

  public disconnect() {
    return this.firebase.auth().signOut()
  }

  public fetch<T>({ path }: RealTimeFetchParams) {
    return new Promise<T>((resolve) => {
      this.firebase
        .database()
        .ref(path)
        .once(
          'value',
          (snapshot) => {
            resolve(snapshot.val())
          },
          this.handleAuthenticationErrors,
        )
    })
  }

  public subscribe<T>({
    path,
    callback,
    event = 'value',
  }: RealTimeSubscribeParams<T>) {
    const ref = this.firebase.database().ref(path)
    const cb = (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val() as T)
    }

    ref.on(event, cb, this.handleAuthenticationErrors)
    return () => ref.off(event, cb)
  }

  public unsubscribe({ path, event = 'value' }: RealTimeUnsubscribeParams) {
    this.firebase.database().ref(path).off(event)
  }
}

export default new RealTimeApi()
