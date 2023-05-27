import type {FC} from 'react';
import {useProfile} from "@hooks/useProfile";
import {LogInButton} from "@containers/containers/aside/layout/profile/LogInButton";
import {ProfilePopover} from "@containers/containers/aside/layout/profile/ProfilePopover";

export const Profile: FC = () => {
    const {profile} = useProfile();
    return profile ? <ProfilePopover profile={profile} /> : <LogInButton />;
};