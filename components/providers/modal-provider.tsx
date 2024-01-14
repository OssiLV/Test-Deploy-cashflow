"use client";

import { useEffect, useState } from "react";

import { ModalCreateRoom } from "@/components/modals/modal-create-room";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ModalCreateRoom />
        </>
    );
};
