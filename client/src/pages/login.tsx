import {Login} from '@containers/cards/Login';
import AuthProvider from "@providers/AuthProvider";
import {Meta} from "@containers/Meta";

export default function AuthLogin() {
    return (
        <Meta title="Login">
            <AuthProvider forAuth={false}>
                <main className="h-screen flex justify-center items-center select-none">
                    <Login/>
                </main>
            </AuthProvider>
        </Meta>
    );
}
