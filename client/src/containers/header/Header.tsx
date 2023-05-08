import type {FC} from 'react';
import {QueryInput} from "@containers/header/layout/QueryInput";

export const Header: FC = () => {
    return (
        <header className="sticky w-full flex justify-center px-custom h-16 items-center bg-popover">
            <QueryInput className="w-full md:w-3/4 lg:w-2/5"/>
        </header>
    );
};