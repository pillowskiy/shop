import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {Favorites} from "@containers/Favorites";
import AuthProvider from "@providers/AuthProvider";

export default function Page() {
    return (
        <Meta title="Product">
            <AuthProvider forAuth={true}>
                <Main className="min-h-screen-64">
                    <Favorites />
                </Main>
            </AuthProvider>
        </Meta>
    );
}