import { FirebaseOptions, initializeApp } from 'firebase/app'
import { User, getAuth, signInAnonymously } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

const VITE_FIREBASE_API_KEY: string = import.meta.env.VITE_FIREBASE_API_KEY
const VITE_FIREBASE_AUTH_DOMAIN: string = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const VITE_FIREBASE_DATABASE_URL: string = import.meta.env.VITE_FIREBASE_DATABASE_URL
const VITE_FIREBASE_PROJECT_ID: string = import.meta.env.VITE_FIREBASE_PROJECT_ID
const VITE_FIREBASE_STORAGE_BUCKET: string = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const VITE_FIREBASE_MESSAGING_SENDER_ID: string = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const VITE_FIREBASE_MESSAGING_APP_ID: string = import.meta.env.VITE_FIREBASE_MESSAGING_APP_ID

const firebaseConfig: FirebaseOptions = {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: VITE_FIREBASE_DATABASE_URL,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_MESSAGING_APP_ID,
}

const app = initializeApp(firebaseConfig)

type UserContextType = {
    user: User | null
}

const UserContext = createContext<UserContextType>({
    user: null,
})

export type UserContextProps = {
    children: ReactNode
}

const UserContextProvider: FC<UserContextProps> = (props) => {
    const { children } = props
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const auth = getAuth()
        signInAnonymously(auth)
            .then(() => {
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    setUser(user)
                })
                return () => {
                    unsubscribe()
                }
            })
            .catch(() => {
                setUser(null)
            })
    }, [])

    return <UserContext.Provider value={{ user: user }}>{children}</UserContext.Provider>
}

export default UserContextProvider
