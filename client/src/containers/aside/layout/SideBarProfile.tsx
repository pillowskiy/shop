import type {FC} from 'react';
import {useProfile} from "@hooks/useProfile";
import {LogInButton} from "@containers/aside/layout/profile/LogInButton";
import {ProfilePopover} from "@containers/aside/layout/profile/ProfilePopover";

export const SideBarProfile: FC = () => {
    const {profile} = useProfile();
    return profile ? <ProfilePopover profile={profile} /> : <LogInButton />;
};