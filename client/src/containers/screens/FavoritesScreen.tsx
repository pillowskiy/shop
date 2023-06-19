import type {FC} from 'react';

import AuthProvider from "@providers/AuthProvider";

import {EmptyItems} from "@containers/EmptyItems";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";

import {FavoriteProductCard} from "@containers/product";
import {useFavorites} from "@hooks/useFavorites";
import {HorizontalSkeleton} from "@containers/product/cards/HorizontalSkeleton";

export const FavoritesScreen: FC = () => {
    const {data, isLoaded} = useFavorites();

    return (
        <Meta title="Favorites">
            <AuthProvider forAuth={true}>
                <Main className="min-h-screen-64">
                    {
                        !isLoaded ? (
                            <div>
                                {Array.from({length: 20}, (_, index) => (
                                    <HorizontalSkeleton key={index}/>
                                ))}
                            </div>
                        ) : !data?.products.length ? (
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