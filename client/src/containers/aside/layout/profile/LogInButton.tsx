import type {FC} from 'react';
import {SideBarItem} from "@containers/aside/layout/SideBarItem";
import {LogIn} from 'lucide-react';
import {useRouter} from "next/router";

export const LogInButton: FC = () => {
    const router = useRouter();
    return (
        <SideBarItem Icon={LogIn} title="Log in" className="md:mt-auto" onClick={() => router.push('/login')} />
    );
};