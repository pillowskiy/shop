import type {FC} from 'react';
import {ProductSort} from "@/types/product.interface";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Carousel} from "@containers/swiper/Carousel";
import {GoodsHeading} from "@components/GoodsHeading";

import {CategoryCatalog} from "./layout/CategoryCatalog";
import {ProductCatalog} from "./layout/ProductCatalog";

export const HomeScreen: FC = () => {
    return (
        <Meta title="Online Shop">
            <Main>
                <Carousel/>
                <GoodsHeading href="/categories">Categories</GoodsHeading>
                <CategoryCatalog perPage={4} page={1}/>

                <GoodsHeading href="/" badge="novelties 🔥">Newest</GoodsHeading>
                <ProductCatalog page={1} perPage={8} sort={ProductSort.HighPrice}/>

                <GoodsHeading href="/">Popular Products</GoodsHeading>
                <ProductCatalog page={1} perPage={8} sort={ProductSort.Popular}/>

                <GoodsHeading href="/">Rated Products</GoodsHeading>
                <ProductCatalog page={1} perPage={8} sort={ProductSort.Rated}/>
            </Main>
        </Meta>
    );
};