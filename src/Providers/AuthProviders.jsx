import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from './../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)

            if(currentUser && currentUser.email){
                const loggedUser = {
                    email:currentUser.email
                 }
                 fetch("http://localhost:5000/jwt", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(loggedUser)
                 })
                 .then(res=>res.json())
                 .then(data=>{
                    localStorage.setItem("car-access-token", data.token)
                })
            }else{
                localStorage.removeItem("car-access-token")
            }
              

        })
        return ()=>{
            return unsubscribe()
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleSignIn,
        logOutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;