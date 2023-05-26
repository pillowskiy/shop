import type {FC} from 'react';

import AuthProvider from "@providers/AuthProvider";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Login} from "@containers/cards/Login";

export const LoginScreen: FC = () => {
    return (
        <Meta title="Login">
            <AuthProvider forAuth={false}>
                <Main className="h-screen-64 flex justify-center items-center select-none bg-white">
                    <Login/>
                </Main>
            </AuthProvider>
        </Meta>
    );
};