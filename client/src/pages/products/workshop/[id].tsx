import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import {WorkShop} from "@containers/workshop/WorkShop";
import AuthProvider from "@providers/AuthProvider";

export default function Page() {
    return (
        <Meta title="Workshop">
            <AuthProvider forAuth={true}>
                <Header/>
                <SideBar/>
                <Main className="flex flex-col justify-center items-center min-h-screen-64 gap-4 relative">
                    <WorkShop/>
                </Main>
            </AuthProvider>
        </Meta>
    );
}