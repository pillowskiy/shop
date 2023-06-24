import type {FC} from 'react';
import {useProfile} from "@hooks/useProfile";
import {ProfilePopover} from "@containers/user/layout/ProfilePopover";
import {LogIn} from "lucide-react";
import {Item} from "@containers/containers/aside/layout/Item";
import Image from "next/image";
import {Skeleton} from "@ui/Skeleton";

export const Profile: FC = () => {
    const {profile, isInitialLoading} = useProfile();
    return isInitialLoading ? (
        <li
            className="cursor-pointer py-2 rounded-lg text-center w-1/5 h-full md:hidden select-none"
        >
            <Skeleton className="w-12 h-12 object-cover object-top m-auto rounded-full"/>
        </li>
    ) : profile ?
        (
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
        ) : (
            <Item className="md:hidden" href="/login" Icon={LogIn} title="Log in"/>
        );
};