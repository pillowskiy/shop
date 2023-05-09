"use client"

import {Anchor} from "@ui/Anchor";
import {Header} from "@containers/header/Header";
import {SideBar} from "@containers/aside/SideBar";
import {OfferCarousel} from "@containers/swiper/OfferCarousel";
import {Main} from "@containers/Main";

export default function Home() {
    return (
        <>
            <Header/>
            <SideBar/>
            <Main>
                <OfferCarousel/>
                <Anchor href="/products">Products</Anchor>
                <Anchor href="/login">Login</Anchor>
                <Anchor href="/register">Register</Anchor>
            </Main>
        </>
    )
}
