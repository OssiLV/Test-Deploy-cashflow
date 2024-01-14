import { FirebaseContext } from "@/components/providers/firebase-provider";
import { User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { useContext } from "react";
interface useGoogleAuthProps {
    firestore: Firestore;
    user: User;
    googleSignIn: () => void;
    logOut: () => void;
}
export const useGoogleAuth = () => {
    const context = useContext(FirebaseContext) as useGoogleAuthProps;
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return context;
};
