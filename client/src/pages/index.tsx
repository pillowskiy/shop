"use client"

import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";
import {Catalog} from "@containers/Catalog";
import {NextPage} from "next";
import {Carousel} from "@containers/swiper/Carousel";
import {PopularCategories} from "@containers/PopularCategories";
import {ProductSort} from "@/types/product.interface";
import {GoodsHeading} from "@components/GoodsHeading";

const HomePage: NextPage = () => {
    return (
        <Meta title="Online Shop">
            <Header/>
            <SideBar/>
            <Main>
                <Carousel/>
                <GoodsHeading>Popular Categories</GoodsHeading>
                <PopularCategories />

                <GoodsHeading badge="novelties 🔥">Newest</GoodsHeading>
                <Catalog page={1} perPage={8} sort={ProductSort.HighPrice} />

                <GoodsHeading>Popular Products</GoodsHeading>
                <Catalog page={1} perPage={8} />

                <GoodsHeading>Rated Products</GoodsHeading>
                <Catalog page={1} perPage={8} />
            </Main>
        </Meta>
    );
}

// Temporarily commented out due to the use of dynamic rendering in the catalog

/* export const getStaticProps: GetStaticProps<GetAllProductsResponse> = async () => {
    const {data} = await ProductService.getAll({
        page: 1,
        perPage: 12,
    });

    return {
        props: {
            ...data,
        },
    };
} */

export default HomePage;