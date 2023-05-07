import type {FC} from 'react';
import {useAuth} from "@hooks/useAuth";
import {Button} from "@ui/Button";
import Link from "next/link";

export const ProfileButton: FC = () => {
    const { user } = useAuth();

    return (
        <Button variant="outline" className="bg-muted hover:bg-muted-foreground">
            { !user && <Link href="/login">Log in</Link> }
            { user && user.name }
        </Button>
    );
};