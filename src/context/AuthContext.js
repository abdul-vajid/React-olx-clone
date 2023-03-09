import { createContext, useContext, useState } from "react";
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, addDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    async function signUp(email, password, username, phone) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user.uid)

        await setDoc(doc(db, 'users', user.uid), {
            userId: user.uid,
            username: username,
            phone: phone
        });
    }


    function logIn(email, password) {
        try {
            return signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error.message;
        }
    }

    function logOut() {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}