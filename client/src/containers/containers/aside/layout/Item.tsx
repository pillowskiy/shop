import type {FC, HTMLAttributes, PropsWithChildren} from "react";
import {cn} from "@lib/utils";
import {LucideIcon} from "lucide-react";
import {useRouter} from "next/router";

interface SideBarItemProps extends HTMLAttributes<HTMLLIElement> {
    title?: string;
    Icon: LucideIcon;
    href: string;
}

export const Item: FC<PropsWithChildren<SideBarItemProps>> = ({
    children,
    className,
    title,
    Icon,
    href,
    ...props
}) => {
    const router = useRouter();

    return (
        <li
            className={cn(
                "cursor-pointer p-2 md:hover:bg-muted rounded-lg transition-all text-center w-1/5 md:w-10/12",
                className, { 'md:bg-muted': router.asPath === href}
            )}
            onClick={() => router.push(href)}
            {...props}
        >
            <Icon className="h-7 w-7 m-auto" />
            <p className="text-xs">{title}</p>
        </li>
    )
}