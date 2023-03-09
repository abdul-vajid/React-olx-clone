import { createContext, useContext, useState } from "react";
import { auth} from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    
    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
    }
    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}> 
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}