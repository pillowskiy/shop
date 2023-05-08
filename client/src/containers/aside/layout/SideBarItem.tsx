import type {FC, HTMLAttributes, PropsWithChildren} from "react";
import {cn} from "@lib/utils";

interface SideBarItemProps extends HTMLAttributes<HTMLLIElement> {}

export const SideBarItem: FC<PropsWithChildren<SideBarItemProps>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <li
            className={cn("cursor-pointer p-2 hover:bg-muted rounded-lg transition-all", className)}
            {...props}
        >
            {children}
        </li>
    )
}