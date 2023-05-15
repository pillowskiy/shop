import type {FC, HTMLAttributes, PropsWithChildren} from "react";
import {cn} from "@lib/utils";
import {LucideIcon} from "lucide-react";

interface SideBarItemProps extends HTMLAttributes<HTMLLIElement> {
    title?: string;
    Icon: LucideIcon;
}

export const SideBarItem: FC<PropsWithChildren<SideBarItemProps>> = ({
    children,
    className,
    title,
    Icon,
    ...props
}) => {
    return (
        <li
            className={cn("cursor-pointer p-2 hover:bg-muted rounded-lg transition-all text-center w-1/4 md:w-10/12", className)}
            {...props}
        >
            <Icon className="h-7 w-7 m-auto" />
            <p className="text-xs">{title}</p>
        </li>
    )
}