import type {FC} from 'react';
import {Loader as LoaderIcon} from "lucide-react";

export const Loader: FC = () => {
    return (
        <div
            className="w-full h-screen-64 flex items-center justify-center"
        >
            <LoaderIcon className="w-[128px] h-[128px] animate-spin" />
        </div>
    );
};