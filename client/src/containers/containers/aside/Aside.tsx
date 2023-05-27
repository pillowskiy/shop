import type {FC} from 'react';
import {ShoppingCart, Heart, List, Home} from "lucide-react";
import {cn} from "@lib/utils";

import * as SideBar from './layout';

export const Aside: FC = () => {
    return (
        <aside className={cn(
            "fixed bottom-0 md:top-0 md:bottom-auto text-foreground bg-popover border-muted border-t shadow-md md:shadow-none",
            "w-full md:w-20 md:pt-48 md:pb-4 md:px-0 h-14 md:h-screen z-20"
        )}
        >
            <SideBar.Items>
                <SideBar.Item href="/" Icon={Home} title="Home" />
                <SideBar.Item href="#" Icon={ShoppingCart} title="Cart" />
                <SideBar.Item href="/favorites" Icon={Heart} title="Favorites" />
                <SideBar.Item href="/orders" Icon={List} title="Orders" />
                <SideBar.Profile />
            </SideBar.Items>
        </aside>
    );
};