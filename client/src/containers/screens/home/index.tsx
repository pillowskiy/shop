import type {FC} from 'react';
import {ProductSort} from "@/types/product.interface";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Carousel} from "@containers/swiper/Carousel";
import {GoodsHeading} from "@components/GoodsHeading";

import {PopularCategories} from "@containers/screens/home/layout/PopularCategories";
import {ProductCatalog} from "@containers/screens/home/layout/ProductCatalog";

export const HomeScreen: FC = () => {
    return (
        <Meta title="Online Shop">
            <Main>
                <Carousel/>
                <GoodsHeading>Popular Categories</GoodsHeading>
                <PopularCategories/>

                <GoodsHeading badge="novelties 🔥">Newest</GoodsHeading>
                <ProductCatalog page={1} perPage={8} sort={ProductSort.HighPrice}/>

                <GoodsHeading>Popular Products</GoodsHeading>
                <ProductCatalog page={1} perPage={8}/>

                <GoodsHeading>Rated Products</GoodsHeading>
                <ProductCatalog page={1} perPage={8}/>
            </Main>
        </Meta>
    );
};