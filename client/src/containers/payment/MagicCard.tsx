import type {FC, HTMLAttributes} from 'react';
import {useProfile} from "@hooks/useProfile";
import {Wifi} from "lucide-react";
import Image from "next/image";
import {cn} from "@lib/utils";

interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {}

export const MagicCard: FC<MagicCardProps> = ({className, ...props}) => {
    const {profile} = useProfile();
    // Four years
    const expiresEnd = new Date(Date.now() + 3600 * 24 * 30 * 48);

    return (
        <main
            className={cn(
                "relative rounded-lg bg-white font-consolas",
                "text-center overflow-hidden w-[340px] h-fit select-none", className
            )}
            {...props}
        >
            <section className="absolute top-0 left-0 w-full animate-randomly-x">
                <div className="w-[96px] h-[96px] rounded-full bg-red-500 blur-xl animate-randomly-y" />
            </section>

            <section className="absolute top-0 right-0 w-full animate-randomly-x">
                <div className="w-[64px] h-[64px] rounded-full bg-green-500 blur-xl animate-randomly-y" />
            </section>

            <section className="absolute top-0 right-[50%] left-[50%] w-full animate-randomly-x">
                <div className="w-[96px] h-[96px] rounded-full bg-yellow-500 blur-xl animate-randomly-y" />
            </section>


            <section className="backdrop-blur-[8px] bg-transparent p-6 pt-8 pb-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <Wifi className="rotate-[90deg] text-primary opacity-90"/>
                    <div className="w-12 h-8 rounded-lg bg-warning" />
                </div>

                <h2 className="text-2xl text-primary my-2">4716 6109 3132 3010</h2>

                <footer className="relative text-left uppercase text-sm text-primary font-medium">
                    <p className="lowercase text-[10px] leading-3 opacity-90">valid thru</p>
                    <h3 className="leading-3">{expiresEnd.getMonth()}/{expiresEnd.getFullYear()}</h3>
                    <h3 className="opacity-90 leading-3">{profile?.name}</h3>
                    <h3 className="opacity-80 leading-3">USD</h3>
                    <Image
                        className="absolute top-0 right-0 top-[50%] -translate-y-[50%]"
                        src={"https://altcoinsbox.com/wp-content/uploads/2023/03/magic-logo.png"}
                        alt="Card Image"
                        width={36}
                        height={36}
                    />
                </footer>
            </section>
        </main>
    );
};