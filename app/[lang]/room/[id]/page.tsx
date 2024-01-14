"use client";

import { Button } from "@/components/ui/button";
import { dictionary } from "@/content";
import { useFireStoreCollection, useFirebase } from "@/hooks/use-firebase";
import { cn } from "@/lib/utils";
import { IPlayer } from "@/types/type-player";
import {
    PersonIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { useRouter, useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import {
    deleteDoc,
    doc,
    getDoc,
    arrayRemove,
    updateDoc,
} from "firebase/firestore";
import { IRoom } from "@/types/type-room";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { useEffect, useState } from "react";

const PersonPC = ({
    id,
    name,
    status,
}: {
    id: string;
    name: string;
    status: boolean;
}) => {
    const { lang } = useParams();
    // console.log(name);

    return (
        <div className=" cursor-pointer rounded-[38px] group relative">
            <div className="absolute z-20 top-4 left-14 text-center mb-1 text-orange-400 font-bold underline tracking-wider">
                {status && dictionary[lang as string]?.statusPerson}
            </div>
            <div className="shadow-Neumorphism_2 bg-[#d4cece] rounded-[38px] w-40 h-56 relative opacity-50 group-hover:shadow-Neumorphism_rose transition-all">
                <div className="absolute top-12 right-4">
                    <PersonIcon className="w-32 h-32  group-hover:text-rose-500 text-slate-100/20 transition-all " />
                </div>
            </div>
            <div className="text-center font-semibold text-slate-600 group-hover:text-rose-400">
                {name}
            </div>
        </div>
    );
};

const PersonMobile = ({
    id,
    name,
    status,
}: {
    id: string;
    name: string;
    status: boolean;
}) => {
    const { lang } = useParams();

    return (
        <div className=" cursor-pointer rounded-[38px] group relative">
            <div className="absolute z-20 top-4 left-10 text-center mb-1 text-orange-400 font-bold underline tracking-wider">
                {status && dictionary[lang as string]?.statusPerson}
            </div>
            <div className="shadow-Neumorphism_2 bg-[#d4cece] rounded-[38px] w-32 h-56 relative opacity-50 group-hover:shadow-Neumorphism_rose transition-all">
                <span className="absolute top-12 right-0">
                    <PersonIcon className="w-32 h-32  group-hover:text-rose-500 text-slate-100/20 transition-all " />
                </span>
            </div>
            <p className="text-center font-semibold text-slate-600 group-hover:text-rose-400">
                {name}
            </p>
        </div>
    );
};

export default function RoomId() {
    const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);
    const { firestore } = useFirebase();
    const router = useRouter();
    const { lang, id } = useParams();
    const { value } = useFireStoreCollection({ collectionName: "room" });
    const { user } = useGoogleAuth();
    const document = doc(firestore, "room", id as string);

    const isNoneMobileDevice = useMediaQuery({
        query: "(min-device-width: 500px)",
    });

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 500px)",
    });
    const isOwner = Boolean(user?.uid === currentRoom?.createdBy);

    useEffect(() => {
        getDoc(document).then((res) => setCurrentRoom(res.data() as IRoom));
    }, [id, value?.docChanges()]);

    const handleDelete = async () => {
        router.push(`/${lang}`);
        if (isOwner) {
            await deleteDoc(document);
        }
    };

    function handleBack() {
        updateDoc(document, {
            players: arrayRemove({
                id: user.uid,
                name: user.displayName,
                isOwner: user.uid === currentRoom?.createdBy,
                // isOwner: true,
            }),
        });
        router.push(`/${lang}`);
    }

    useEffect(() => {
        getDoc(document).then((res) => {
            const room = res.data() as IRoom;
            if (!room) {
                router.push(`/${lang}`);
                return;
            }
        });
    }, []);

    return (
        <div className="select-none py-4">
            <div className="shadow-Neumorphism rounded-[50px] min-h-[38rem] w-[22rem] md:w-[40rem] lg:w-[60rem] xl:w-[80rem]  bg-[#e5e1e1] py-4 px-8">
                {/* NONE MOBILE */}
                {isNoneMobileDevice && (
                    <div className="flex flex-col gap-10">
                        <div className="flex justify-between">
                            <Button
                                variant="link"
                                className="text-red-400 flex  gap-1"
                                onClick={handleBack}
                            >
                                <DoubleArrowLeftIcon />
                                {dictionary[lang as string]?.buttonBack}
                            </Button>

                            {isOwner && (
                                <Button
                                    variant="link"
                                    className="text-red-400 flex  gap-1"
                                    onClick={handleDelete}
                                >
                                    <TrashIcon />
                                    {
                                        dictionary[lang as string]
                                            ?.buttonDeleteRoom
                                    }
                                </Button>
                            )}
                        </div>

                        <div className=" gap-4 flex items-center justify-center ">
                            {currentRoom?.players.map((player: IPlayer) => (
                                <PersonPC
                                    key={player.id}
                                    id={player.id}
                                    name={player.name}
                                    status={true}
                                />
                            ))}
                        </div>

                        <div className="flex items-end justify-center mt-9">
                            <Button
                                variant="default"
                                className="font-bold flex w-[50%]  gap-1"
                                onClick={() => router.push(`/room/${id}/job`)}
                            >
                                {dictionary[lang as string]?.buttonNext}
                                <DoubleArrowRightIcon />
                            </Button>
                        </div>
                    </div>
                )}

                {/* MOBILE */}
                {isMobileDevice && (
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <Button
                                variant="link"
                                className="text-red-400 flex gap-1"
                                onClick={handleBack}
                            >
                                <DoubleArrowLeftIcon />
                                {dictionary[lang as string]?.buttonBack}
                            </Button>
                            {isOwner && (
                                <Button
                                    variant="link"
                                    className="text-red-400 flex  gap-1"
                                    onClick={handleDelete}
                                >
                                    <TrashIcon />
                                    {
                                        dictionary[lang as string]
                                            ?.buttonDeleteRoom
                                    }
                                </Button>
                            )}
                        </div>

                        <div
                            className={cn(
                                "mt-2 gap-4 ",
                                currentRoom?.players.length == 1 &&
                                    "flex justify-center",
                                currentRoom?.players.length == 2 &&
                                    "grid grid-flow-col grid-rows-1",
                                (currentRoom?.players.length == 3 ||
                                    currentRoom?.players.length == 4 ||
                                    currentRoom?.players.length == 5) &&
                                    "grid grid-flow-row grid-cols-2",
                                currentRoom?.players.length == 6 &&
                                    "grid grid-cols-2 grid-flow-row"
                            )}
                        >
                            {currentRoom?.players.map((player: IPlayer) => (
                                <PersonPC
                                    key={player.id}
                                    id={player.id}
                                    name={player.name}
                                    status={true}
                                />
                            ))}
                        </div>
                        <div className="flex items-end justify-center mt-9">
                            <Button
                                variant="default"
                                className="font-bold flex gap-1 w-full"
                                onClick={() => router.push(`/room/${id}/job`)}
                            >
                                {dictionary[lang as string]?.buttonNext}
                                <DoubleArrowRightIcon />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
