"use client";

import { createContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    User,
} from "firebase/auth";

const initFirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const FirebaseContext = createContext({});
export const FirebaseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    initializeApp(initFirebaseConfig);
    let firestore = getFirestore();
    const auth = getAuth(firestore.app);
    const [user, setUser] = useState<User | null>(null);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubcribe();
    }, [auth, user]);

    return (
        <FirebaseContext.Provider
            value={{ firestore, user, googleSignIn, logOut }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};
