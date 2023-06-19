import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {ProfileWorkshopTab} from "@containers/user/cards/workshop";
import {Meta} from "@containers/Meta";
import AuthProvider from "@providers/AuthProvider";
import {Main} from "@containers/Main";
import {useProfile} from "@hooks/useProfile";
import {createContext} from "react";

export const AccountContext = createContext<User | undefined>(undefined);
export const UserWorkshopScreen: FC = () => {
    const {profile} = useProfile();
    return (
        <Meta title={`Profile ${profile?.name || ""}`}>
            <AuthProvider forAuth={true}>
                <Main className="flex flex-col items-center justify-start min-h-screen-64 relative">
                    <AccountContext.Provider value={profile}>
                        <ProfileWorkshopTab/>
                    </AccountContext.Provider>
                </Main>
            </AuthProvider>
        </Meta>
    );
};