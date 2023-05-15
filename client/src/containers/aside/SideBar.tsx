import type {FC} from 'react';
import {SideBarItems} from "@containers/aside/layout/SideBarItems";
import {SideBarItem} from "@containers/aside/layout/SideBarItem";
import {Globe2, ShoppingCart, Heart, List, LogIn} from "lucide-react";
import {cn} from "@lib/utils";

export const SideBar: FC = () => {
    return (
        <aside className={cn(
            "fixed bottom-0 md:top-0 md:bottom-auto text-foreground bg-popover border-muted border-t shadow-md md:shadow-none",
            "w-full md:w-20 md:pt-32 md:pb-4 md:px-0 h-14 md:h-screen z-20"
        )}
        >
            <SideBarItems>
                <SideBarItem Icon={ShoppingCart} title="Cart" />
                <SideBarItem Icon={Heart} title="Favorites" />
                <SideBarItem Icon={List} title="Orders" />
                <SideBarItem Icon={Globe2} className="mt-auto" title="Language" />
            </SideBarItems>
        </aside>
    );
};