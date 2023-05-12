import type {FC} from 'react';
import {SearchBar} from "./layout/SearchBar";
import {cn} from "@lib/utils";

export const Header: FC = () => {
    return (
        <header
            className={cn(
                "sticky shadow-md md:shadow-none top-0 w-full flex justify-center",
                "px-custom h-16 items-center bg-popover z-20"
            )}
        >
            <SearchBar/>
        </header>
    );
};