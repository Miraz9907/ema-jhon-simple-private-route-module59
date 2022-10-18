import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    const creatUser = (email, password) =>{
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password );
    }

    const signIn = (email, password) =>{
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () =>{
        setloading(true);

        return signOut(auth);
    }

    useEffect(() =>{
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            console.log('current User insed state changed', currentUser);
            setUser(currentUser);
            setloading(false);
        });

        return () => unSubscribe();

    },[])


   const authInfo = {user, loading, creatUser, signIn, logout}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default UserContext;