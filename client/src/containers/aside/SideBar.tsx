import type {FC} from 'react';
import {SideBarItems} from "@containers/aside/layout/SideBarItems";
import {SideBarItem} from "@containers/aside/layout/SideBarItem";
import {Globe2, ShoppingCart, Heart, List, LogIn} from "lucide-react";
import {cn} from "@lib/utils";
import {useProfile} from "@hooks/useProfile";
import Link from "next/link";
import Image from "next/image";

export const SideBar: FC = () => {
    const {profile} = useProfile();
    return (
        <aside className={cn(
            "fixed bottom-0 md:top-0 md:bottom-auto text-foreground bg-popover border-muted border-t shadow-md md:shadow-none",
            "w-full md:w-20 md:pt-32 md:pb-custom px-custom md:px-0 h-12 md:h-screen z-20"
        )}
        >
            <SideBarItems>
                <SideBarItem>
                    <ShoppingCart className="h-8 w-8"/>
                </SideBarItem>
                <SideBarItem>
                    <Heart className="h-8 w-8"/>
                </SideBarItem>
                <SideBarItem>
                    <List className="h-8 w-8"/>
                </SideBarItem>
                <SideBarItem>
                    <Globe2 className="h-8 w-8"/>
                </SideBarItem>

                <SideBarItem className="md:last:mt-auto hover:bg-transparent">
                    {profile ?
                        <Image
                            className="h-8 w-8 md:h-12 md:w-12 object-cover rounded-full"
                            width={360}
                            height={360}
                            src={profile.avatarURL}
                            alt={profile.name}
                        /> :
                        <Link href="/login">
                            <LogIn className="h-8 w-8 shrink-0"/>
                        </Link>
                    }
                </SideBarItem>
            </SideBarItems>
        </aside>
    );
};