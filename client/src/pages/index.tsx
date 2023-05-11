"use client"

import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {OfferCarousel} from "@containers/swiper/OfferCarousel";
import {Main} from "@containers/Main";
import {Meta} from "@containers/Meta";
import {Catalog} from "@containers/Catalog";
import {GetStaticProps, NextPage} from "next";
import {GetAllProductsResponse} from "@/types/product.interface";
import ProductService from "@api/services/product.service";

const HomePage: NextPage<GetAllProductsResponse> = ({products, length}) => {
    return (
        <Meta title="Online Shop">
            <Header/>
            <SideBar/>
            <Main>
                <OfferCarousel/>
                <Catalog products={products} length={length}/>
            </Main>
        </Meta>
    );
}

export const getStaticProps: GetStaticProps<GetAllProductsResponse> = async () => {
    const {data} = await ProductService.getAll({
        page: 1,
        perPage: 10,
    });

    return {
        props: {
            ...data,
        }
    };
}

export default HomePage;