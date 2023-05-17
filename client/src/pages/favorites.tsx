import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import AuthProvider from "@providers/AuthProvider";
import {useProfile} from "@hooks/useProfile";
import {FavoriteItem} from "@containers/cards/favorite/FavoriteItem";

export default function Page() {
    const {profile} = useProfile();
    return (
        <Meta title="Product">
            <AuthProvider forAuth={true}>
                <Header/>
                <SideBar/>
                <Main className="h-screen-64">
                    {profile?.favorites.map(product => (
                        <FavoriteItem key={product.id} product={product}/>
                    ))}
                </Main>
            </AuthProvider>
        </Meta>
    );
}