import type {FC} from 'react';

import AuthProvider from "@providers/AuthProvider";

import {EmptyItems} from "@containers/EmptyItems";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";

import {FavoriteProductCard} from "@containers/product";
import {useFavorites} from "@hooks/useFavorites";

export const FavoritesScreen: FC = () => {
    const {data} = useFavorites();

    return (
        <Meta title="Favorites">
            <AuthProvider forAuth={true}>
                <Main className="min-h-screen-64">
                    {
                        !data?.products.length ? (
                            <EmptyItems>There are not favorite items yet</EmptyItems>
                        ) : data.products.map(product => (
                            <FavoriteProductCard key={product.id} product={product}/>
                        ))
                    }
                </Main>
            </AuthProvider>
        </Meta>
    );
};