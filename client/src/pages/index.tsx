"use client"

import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {OfferCarousel} from "@containers/swiper/OfferCarousel";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";
import {Catalog} from "@containers/Catalog";
import {NextPage} from "next";
import {Carousel} from "@containers/swiper/Carousel";

const HomePage: NextPage = () => {
    return (
        <Meta title="Online Shop">
            <Header/>
            <SideBar/>
            <Main>
                <Carousel/>
                <Catalog/>
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