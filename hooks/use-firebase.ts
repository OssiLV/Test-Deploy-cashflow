import { useContext } from "react";
import { FirebaseContext } from "@/components/providers/firebase-provider";
import { FirebaseApp } from "firebase/app";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

interface useFirebaseProps {
    firestore: Firestore;
}
export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return context as useFirebaseProps;
};
interface useFireStoreProps {
    collectionName: string;
}
export const useFireStoreCollection = ({
    collectionName,
}: useFireStoreProps) => {
    const context = useContext(FirebaseContext) as useFirebaseProps;
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }

    const [value, loading, error] = useCollection(
        collection(context.firestore, collectionName),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return { value, loading, error };
};
