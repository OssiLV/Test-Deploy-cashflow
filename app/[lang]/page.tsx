"use client";

// import { ModeToggle } from "@/components/actions/theme-toggle";
import { dictionary } from "@/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useParams } from "next/navigation";
import { useFireStoreCollection, useFirebase } from "@/hooks/use-firebase";
import { useModal } from "@/hooks/use-modal";
import { IRoom } from "@/types/type-room";
import {
    doc,
    updateDoc,
    arrayUnion,
    query,
    collection,
    where,
    getDocs,
} from "firebase/firestore";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { toast } from "sonner";

function ListRoom({ id, name, players, totalPlayer }: IRoom) {
    const router = useRouter();
    const { lang } = useParams();
    const { user } = useGoogleAuth();
    const { firestore } = useFirebase();
    async function onClick() {
        const collectionRef = collection(firestore, "room");
        const queryFindRoomOwner = query(
            collectionRef,
            where("createdBy", "==", user.uid)
        );

        const roomByOwnerId = (
            await getDocs(queryFindRoomOwner)
        )?.docs[0]?.data() as IRoom;
        const isOwner = Boolean(roomByOwnerId);

        const queryFindRoom = query(collectionRef, where("id", "==", id));
        const roomByRoomId = (
            await getDocs(queryFindRoom)
        ).docs[0].data() as IRoom;

        if (roomByRoomId?.players?.length === totalPlayer) {
            toast("Room full");

            return;
        }

        const document = doc(firestore, "room", id);
        updateDoc(document, {
            players: arrayUnion({
                id: user.uid,
                isOwner,
                name: user.displayName,
            }),
        });
        router.push(`/${lang}/room/${id}`);
    }

    return (
        <Button
            variant="link"
            className="w-full flex justify-start"
            onClick={onClick}
        >
            {name}
            <p className="mx-2 text-orange-300">{`( ${players?.length} / ${totalPlayer})`}</p>
        </Button>
    );
}

export default function Home({ params }: { params: { lang: string } }) {
    const { value } = useFireStoreCollection({ collectionName: "room" });
    const { onOpen } = useModal();
    const { user, logOut } = useGoogleAuth();
    const router = useRouter();

    if (!user) {
        router.push(`/${params.lang}/signIn`);
        return;
    }

    return (
        <main className="absolute top-[14%] left-[6%] lg:top-[10%] lg:left-[38%]">
            <div className="shadow-Neumorphism rounded-[50px] w-[22rem] h-[32rem] bg-[#e5e1e1] flex gap-2 flex-col items-center  p-12">
                <div className=" font-bold text-xl select-none text-rose-500">
                    {dictionary[params.lang]?.homeTitle}
                </div>

                <Button
                    size="sm"
                    className="w-[16rem] select-none"
                    variant="secondary"
                    onClick={() => onOpen("createRoom")}
                >
                    {dictionary[params.lang]?.buttonCreateRoom}
                </Button>

                <Input
                    type="text"
                    placeholder={dictionary[params.lang]?.inputPlaceholder}
                    className="bg-[#dcd5d5]"
                />
                <ScrollArea className="flex border-[3px] border-[#473939] rounded-2xl w-[16rem] h-[18rem] px-2 py-3 select-none">
                    {value?.docs?.map((room) => (
                        <ListRoom
                            key={room.data().id}
                            id={room.data().id}
                            name={room.data().name}
                            players={room.data().players}
                            totalPlayer={room.data().totalPlayer}
                            createdBy={room.data().createdBy}
                        />
                    ))}
                </ScrollArea>
                <Button
                    onClick={logOut}
                    variant="link"
                    className="text-rose-500"
                >
                    {dictionary[params.lang].buttonLogout}
                </Button>
            </div>
        </main>
    );
}
