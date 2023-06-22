import type {FC} from 'react';
import {Button} from "@ui/Button";
import Link from "next/link";

interface NotFoundScreenProps {
    errorMessage?: string;
}

export const NotFoundScreen: FC<NotFoundScreenProps> = ({errorMessage}) => {
    return (
        <div className="text-center absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] select-none">
            <h1 className="text-[76px] font-bold">404</h1>
            <h2 className="text-xl font-medium">Page Not Found</h2>
            <p className="text-mute-foreground">
                {errorMessage || "The address was typed incorrectly or the page no longer exists on the site."}
            </p>
            <Link href="/">
                <Button className="mt-4">Go Home</Button>
            </Link>
        </div>
    );
};