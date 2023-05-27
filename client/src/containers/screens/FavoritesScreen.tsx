import type {FC} from 'react';

import {useProfile} from "@hooks/useProfile";

import AuthProvider from "@providers/AuthProvider";

import {EmptyItems} from "@containers/EmptyItems";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";

import {FavoriteProductCard} from "@containers/product";

export const FavoritesScreen: FC = () => {
    const {profile} = useProfile();

    return (
        <Meta title="Product">
            <AuthProvider forAuth={true}>
                <Main className="min-h-screen-64">
                    {
                        !profile?.favorites.length ? (
                            <EmptyItems>There are not favorite items yet</EmptyItems>
                        ) : profile.favorites.map(product => (
                            <FavoriteProductCard key={product.id} product={product}/>
                        ))
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};