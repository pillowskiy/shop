import {Meta} from "@containers/Meta";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Header} from "@containers/header/Header";
import AuthProvider from "@providers/AuthProvider";
import {useProfile} from "@hooks/useProfile";
import {FavoriteProduct} from "@containers/cards/product/FavoriteProduct";
import {EmptyItems} from "@containers/EmptyItems";

export default function Page() {
    const {profile} = useProfile();
    return (
        <Meta title="Product">
            <AuthProvider forAuth={true}>
                <Header/>
                <SideBar/>
                <Main className="min-h-screen-64">
                    {
                        !profile?.favorites.length ? (
                            <EmptyItems>There are not favorite items yet</EmptyItems>
                        ) : profile?.favorites.map(product => (
                            <FavoriteProduct key={product.id} product={product}/>
                        ))
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
}