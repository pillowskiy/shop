import type {FC} from 'react';
import {LogIn} from "lucide-react";
import {Skeleton} from "@ui/Skeleton";

import {ProfilePopover} from "@containers/user/layout/ProfilePopover";
import {Item} from "@containers/containers/aside/layout/Item";

import {useProfile} from "@hooks/useProfile";
import Image from "next/image";

export const Profile: FC = () => {
    const {profile, isInitialLoading} = useProfile();

    if (isInitialLoading) {
        return (
            <li className="cursor-pointer py-2 rounded-lg text-center w-1/5 h-full md:hidden select-none">
                <Skeleton className="w-12 h-12 object-cover object-top m-auto rounded-full"/>
            </li>
        );
    }

    if (profile) {
        return (
            <ProfilePopover profile={profile}>
                <li
                    className="cursor-pointer py-2 rounded-lg text-center w-1/5 h-full md:hidden select-none"
                >
                    <Image
                        className="w-12 h-12 object-cover object-top m-auto rounded-full"
                        src={profile.avatarURL}
                        alt={profile.name}
                        width={256}
                        height={256}
                    />
                </li>
            </ProfilePopover>
        )
    }

    return <Item className="md:hidden" href="/login" Icon={LogIn} title="Log in"/>;
};