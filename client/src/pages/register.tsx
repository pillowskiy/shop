import {Register} from "@containers/cards/Register";
import AuthProvider from "@providers/AuthProvider";
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

export default function AuthLogin() {
    return (
        <Meta title="Register">
            <AuthProvider forAuth={false}>
                <Main className="h-screen-64 flex justify-center items-center select-none bg-white">
                    <Register/>
                </Main>
            </AuthProvider>
        </Meta>
    );
}
