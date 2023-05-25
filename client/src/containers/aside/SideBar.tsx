import type {FC} from 'react';
import {SideBarItems} from "@containers/aside/layout/SideBarItems";
import {SideBarItem} from "@containers/aside/layout/SideBarItem";
import {ShoppingCart, Heart, List, Home} from "lucide-react";
import {cn} from "@lib/utils";
import {SideBarProfile} from "@containers/aside/layout/SideBarProfile";

export const SideBar: FC = () => {
    return (
        <aside className={cn(
            "fixed bottom-0 md:top-0 md:bottom-auto text-foreground bg-popover border-muted border-t shadow-md md:shadow-none",
            "w-full md:w-20 md:pt-48 md:pb-4 md:px-0 h-14 md:h-screen z-20"
        )}
        >
            <SideBarItems>
                <SideBarItem href="/" Icon={Home} title="Home" />
                <SideBarItem href="#" Icon={ShoppingCart} title="Cart" />
                <SideBarItem href="/favorites" Icon={Heart} title="Favorites" />
                <SideBarItem href="/orders"Icon={List} title="Orders" />
                <SideBarProfile />
            </SideBarItems>
        </aside>
    );
};