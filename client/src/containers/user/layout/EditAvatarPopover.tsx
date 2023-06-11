import type {FC, PropsWithChildren} from 'react';
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import {DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@common/Dialog";
import {Image as ImageIcon} from "lucide-react";
import {Button} from "@ui/Button";
import {ChangeEvent, useState} from "react";
import Image from "next/image";
import {cn} from "@lib/utils";
import {useMutation} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {isAxiosError} from "axios";
import {useToast} from "@common/toast/useToast";
import {useProfile} from "@hooks/useProfile";

export const EditAvatarPopover: FC<PropsWithChildren> = ({children}) => {
    const [image, setImage] = useState<{ preview: string, file: File } | null>(null);
    const [error, setError] = useState("");
    const {toast} = useToast();
    const {profile} = useProfile();

    const {mutate, isLoading} = useMutation(
        ['update profile avatar'],
        ({formData}: { formData: FormData }) => {
            return UserService.update(formData);
        }, {
            onError: (err) => {
                if (!isAxiosError(err)) return;

                const badRequestError = err.response.data?.errors?.avatarURL
                if (badRequestError) {
                    setError(badRequestError);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Uh Oh! something went wrong.",
                        description: err.response?.data?.message || "Unhandled error"
                    });
                }
            },
            onSuccess: () => {
                toast({
                    description: "✅ You have successfully changed avatar"
                });
                setImage(null);
            }
        }
    )

    const onUpload = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (!target.files?.length) return;
        const file = target.files.item(0);
        const preview = URL.createObjectURL(file);
        setImage({ preview, file });
    }

    const onSubmit = () => {
        if (!image) return;
        const formData = new FormData();
        setError("");
        formData.append("id", profile?.id + "");
        formData.append("file", image.file);

        console.log("file", formData.get("file"));
        mutate({formData});
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-fit animate-card-in">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Select an image</DialogTitle>
                </DialogHeader>

                <section
                    className="bg-white border rounded-lg py-4 px-8 flex items-center justify-center flex-col w-fit text-center">
                    <label htmlFor="upload">
                        <input
                            id="upload"
                            type="file"
                            accept="image/,.png,.jpg,.jpeg,.webp"
                            onChange={onUpload}
                            className="hidden"
                        />

                        {image ?
                            <Image
                                className="rounded-full w-[196px] h-[196px] object-cover object-top"
                                src={image.preview}
                                alt="Avatar Image"
                                width={196}
                                height={196}
                            /> : (
                                <div
                                    className="rounded-full bg-primary w-[196px] h-[196px] p-4 flex items-center justify-center cursor-pointer"
                                >
                                    <ImageIcon className="w-16 h-16 text-white opacity-90"/>
                                </div>
                            )
                        }
                        {error && <p className="mt-2 text-destructive text-sm">{error}</p>}
                        <p className={cn("font-medium md:hover:underline transition-all cursor-pointer text-lg mt-4", {
                            "opacity-60": !!image
                        })}>
                            Upload Image
                        </p>
                    </label>
                </section>

                <DialogFooter>
                    <Button
                        className="w-full"
                        disabled={!image || isLoading}
                        onClick={onSubmit}
                    >
                        Apply
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};