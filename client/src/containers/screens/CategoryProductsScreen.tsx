import type {FC} from 'react';

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Carousel} from "@containers/swiper/Carousel";

import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import {Loader} from "@containers/Loader";
import {ProductCard} from "@containers/product/cards/catalog";

interface CategoryProductsScreenProps {
    slug: string;
}

export const CategoryProductsScreen: FC<CategoryProductsScreenProps> = ({slug}) => {
    const {data: products} = useQuery(['get products by category', slug], () => {
        return ProductService.getByCategorySlug(slug);
    }, {
        select: ({data}) => data,
    });

    if (!products || !slug) {
        return <Loader />
    }

    return (
        <Meta title={slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}>
            <Main className="min-h-screen-64">
                <Carousel/>

                <section className="h-fit w-full flex flex-wrap gap-4 box-border">
                    {
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </section>
            </Main>
        </Meta>
    );
};