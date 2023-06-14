import type {FC, PropsWithChildren} from 'react';

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Checkout} from "./";
import type {PromoCode} from "@/types/promo-code.interface";
import {useState} from "react";
import {useCart} from "@hooks/useCart";
import {EmptyItems} from "@containers/EmptyItems";

const CheckoutContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <Meta title="Checkout">
            <Main className="min-h-screen-64 h-auto flex justify-center">
                {children}
            </Main>
        </Meta>
    );
}

export const CheckoutScreen: FC = () => {
    const [promo, setPromo] = useState<PromoCode | null>(null);
    const {items} = useCart();

    if (!items.length) {
        return (
            <CheckoutContainer>
                <EmptyItems>You have no items in your cart.</EmptyItems>
            </CheckoutContainer>
        )
    }

    return (
        <CheckoutContainer>
            <section className="w-full md:w-full lg:w-[920px] xl:w-[1080px] p-4 flex-col sm:flex-row flex gap-4">
                <section className="w-full sm:w-8/12 lg:w-9/12">
                    <Checkout.OrderInfoCard/>
                    <Checkout.OrderContactsCard/>
                    <Checkout.OrderProductsCard/>
                    <Checkout.OrderDeliveryCard/>
                    <Checkout.OrderPaymentCard/>
                    <Checkout.OrderDetailsCard/>
                </section>
                <section className="w-full sm:w-4/12 lg:w-3/12 h-fit sm:sticky top-[72px]">
                    <Checkout.OrderPromoCodeCard promo={promo} setPromo={setPromo}/>
                    <Checkout.OrderConfirmationCard/>
                </section>
            </section>
        </CheckoutContainer>
    );
};