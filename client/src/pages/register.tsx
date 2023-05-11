import {Register} from "@containers/cards/Register";
import AuthProvider from "@providers/AuthProvider";
import {Meta} from "@containers/Meta";

export default function AuthLogin() {
    return (
        <Meta title="Register">
            <AuthProvider forAuth={false}>
                <Register/>
            </AuthProvider>
        </Meta>
    );
}
