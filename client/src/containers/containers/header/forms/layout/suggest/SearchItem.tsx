import {FC, PropsWithChildren} from 'react';
import {cn} from "@lib/utils";

export const SearchItem: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5",
            "text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted transition-all"
        )}
        >
            {children}
        </div>
    );
};