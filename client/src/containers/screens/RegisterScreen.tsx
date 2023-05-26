import type {FC} from 'react';
import {Meta} from "@containers/Meta";
import AuthProvider from "@providers/AuthProvider";
import {Main} from "@containers/Main";
import {Register} from "@containers/cards/Register";

export const RegisterScreen: FC = () => {
    return (
        <Meta title="Register">
            <AuthProvider forAuth={false}>
                <Main className="h-screen-64 flex justify-center items-center select-none bg-white">
                    <Register/>
                </Main>
            </AuthProvider>
        </Meta>
    );
};