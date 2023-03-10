import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    async function signUp(email, password, username, phone) {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(user, { displayName: username });
            await setDoc(doc(db, 'users', user.uid), {
                userId: user.uid,
                username: username,
                phone: phone
            });
        } catch (error) {
            throw error
        }
    }

    function logIn(email, password) {
        try {
            return signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    })

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}