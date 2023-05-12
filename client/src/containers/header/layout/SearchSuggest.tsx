import type {FC, HTMLAttributes, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";

interface SearchSuggestProps extends HTMLAttributes<HTMLDivElement> {
}

export const SearchSuggest: FC<PropsWithChildren<SearchSuggestProps>> = ({children, className, ...props}) => {
    return (
        <section className={cn(
            "max-h-[300px] overflow-y-auto overflow-x-hidden",
            "border shadow-md mt-1 rounded-lg z-20",
            "absolute w-full h-auto top-full bg-popover p-2", className
        )} {...props}>
            {children}
        </section>
    );
};