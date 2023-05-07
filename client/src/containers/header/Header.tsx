import type {FC} from 'react';
import {ProfileButton} from "@containers/header/layout/ProfileButton";
import {QueryInput} from "@containers/header/layout/query";
import {CatalogButton} from "@containers/header/layout/CatalogButton";

export const Header: FC = () => {
    return (
        <header className="relative top-0 z-10 flex justify-between w-screen h-16 px-custom bg-primary items-center">
            <CatalogButton />
            <QueryInput className="w-3/4"/>
            <ProfileButton />
        </header>
    );
};