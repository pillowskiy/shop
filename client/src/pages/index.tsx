"use client"

import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";
import {Catalog} from "@containers/Catalog";
import {NextPage} from "next";
import {Carousel} from "@containers/swiper/Carousel";
import {PopularCategories} from "@containers/PopularCategories";
import {ChevronRight} from "lucide-react";
import {ProductSort} from "@types/product.interface";
import {GoodsHeading} from "@components/GoodsHeading";

const HomePage: NextPage = () => {
    return (
        <Meta title="Online Shop">
            <Header/>
            <SideBar/>
            <Main>
                <Carousel/>
                <div className="mb-2 mt-6 py-1 rounded-lg hover:bg-muted transition-all w-fit hover:px-2 flex gap-1 cursor-pointer">
                    <h1 className="text-xl">Popular Categories</h1>
                    <ChevronRight className="w-5 h-5 mt-1.5"/>
                </div>
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