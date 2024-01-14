"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams } from "next/navigation";
import { dictionary } from "@/content";
import { useFirebase } from "@/hooks/use-firebase";
import { doc, setDoc } from "firebase/firestore";
import { useModal } from "@/hooks/use-modal";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { v4 as uuidV4 } from "uuid";
// ==============

export function ModalCreateRoom() {
    const { lang } = useParams();
    const { firestore } = useFirebase();
    const { user } = useGoogleAuth();
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "createRoom";
    const formSchema = z.object({
        name: z
            .string()
            .min(2, {
                message:
                    dictionary[lang as string]
                        .modalCreateRoomErrorMessageRoomName,
            })
            .max(16, {
                message:
                    dictionary[lang as string]
                        .modalCreateRoomErrorMessageRoomName,
            }),
        totalPlayer: z.string().min(1).max(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            totalPlayer: "1",
        },
    });
    const handleClose = () => {
        form.reset();
        onClose();
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const roomUUID = uuidV4();
        const document = doc(firestore, "room", roomUUID);

        const dataUpdated = await setDoc(document, {
            id: roomUUID,
            name: values.name,
            totalPlayer: parseInt(values.totalPlayer),
            players: [],
            createdBy: user.uid,
        });
        handleClose();
        // console.log(values);
    }
    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {dictionary[lang as string].modalCreateRoomTitle}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {
                                                dictionary[lang as string]
                                                    .modalCreateRoomInputRoomeName
                                            }
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    dictionary[lang as string]
                                                        .modalCreateRoomInputRoomeName
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalPlayer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {
                                                dictionary[lang as string]
                                                    .modalCreateRoomInputTotalPlayer
                                            }
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            dictionary[
                                                                lang as string
                                                            ]
                                                                .modalCreateRoomInputTotalPlayer
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    2
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    4
                                                </SelectItem>
                                                <SelectItem value="5">
                                                    5
                                                </SelectItem>
                                                <SelectItem value="6">
                                                    6
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {dictionary[lang as string].buttonCreate}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
