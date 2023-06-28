import {type HTMLAttributes, forwardRef} from "react";
import {LucideIcon} from "lucide-react";
import {useRouter} from "next/router";
import {cn} from "@lib/utils";

interface SideBarItemProps extends HTMLAttributes<HTMLLIElement> {
    title?: string;
    Icon: LucideIcon;
    href?: string;
}

const Item = forwardRef<HTMLLIElement, SideBarItemProps>(({
    children,
    className,
    title,
    Icon,
    href,
    ...props
}, ref) => {
    const router = useRouter();

    return (
        <li
            ref={ref}
            className={cn(
                "relative cursor-pointer p-2 md:hover:bg-muted rounded-lg",
                "transition-all text-center w-3/12 md:w-10/12 select-none",
                className, { 'md:bg-muted': router.asPath === href}
            )}
            onClick={() => href && router.push(href)}
            {...props}
        >
            <Icon className="h-7 w-7 m-auto" />
            <p className="text-xs m-auto">{title}</p>
            {children}
        </li>
    )
});

Item.displayName = "Item";

export { Item };