import type {FC} from 'react';
import {SideBarItems} from "@containers/aside/layout/SideBarItems";
import {SideBarItem} from "@containers/aside/layout/SideBarItem";
import {Globe2, ShoppingCart, Heart, List, LogIn} from "lucide-react";
import {useAuth} from "@hooks/useAuth";
import {cn} from "@lib/utils";

export const SideBar: FC = () => {
    const {user} = useAuth();
    return (
        <aside className={cn(
            "fixed md:static bottom-0 md:top-0 r-0 md:bottom-auto text-foreground bg-popover",
            "w-full md:w-20 md:pt-32 md:pb-custom px-custom md:px-0 h-12 md:h-screen"
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
                    {user ?
                        <img
                            className="h-8 w-8 md:h-12 md:w-12 object-cover rounded-full"
                            src={user.avatarURL}
                            alt={user.name}
                        /> :
                        <LogIn className="h-8 w-8 shrink-0"/>
                    }
                </SideBarItem>
            </SideBarItems>
        </aside>
    );
};