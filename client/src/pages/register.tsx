import {Register} from "@containers/cards/Register";
import AuthProvider from "@providers/AuthProvider";
import {Meta} from "@containers/Meta";

export default function AuthLogin() {
    return (
        <Meta title="Register">
            <AuthProvider forAuth={false}>
                <main className="h-screen flex justify-center items-center select-none">
                    <Register/>
                </main>
            </AuthProvider>
        </Meta>
    );
}
