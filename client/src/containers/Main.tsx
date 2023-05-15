import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement>{}

export const Main: FC<PropsWithChildren<MainContainerProps>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <main
            className={cn(className, "md:ml-20 md:rounded-tl-lg bg-white border border-muted px-custom md:px-8 pb-4")}
            {...props}
        >
            { children }
        </main>
    );
};