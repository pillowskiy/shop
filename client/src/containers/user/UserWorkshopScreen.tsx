import {type FC, createContext} from 'react';
import type {User} from "@/types/user.interface";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {ProfileWorkshopTab} from "@containers/user/cards/workshop";

import {useProfile} from "@hooks/useProfile";
import AuthProvider from "@providers/AuthProvider";

export const AccountContext = createContext<User | undefined>(undefined);
export const UserWorkshopScreen: FC = () => {
    const {profile} = useProfile();
    return (
        <Meta title={`Profile ${profile?.name || ""}`}>
            <AuthProvider forAuth={true}>
                <Main className="flex flex-col items-center justify-start min-h-screen-64">
                    <AccountContext.Provider value={profile}>
                        <ProfileWorkshopTab/>
                    </AccountContext.Provider>
                </Main>
            </AuthProvider>
        </Meta>
    );
};