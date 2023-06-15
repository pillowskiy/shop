import type {FC, PropsWithChildren} from 'react';
import type {CreateOrderItem, CheckoutOrderContext} from "@/types/order.interface";
import type {PromoCode} from "@/types/promo-code.interface";

import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Checkout} from "./";
import {createContext, useState} from "react";
import {useCart} from "@hooks/useCart";
import {EmptyItems} from "@containers/EmptyItems";
import {OrderDetailsValues} from "@/types/order.interface";

export const OrderCheckoutContext = createContext<CheckoutOrderContext>({
    items: [],
    shippingId: -1,
    paymentId: -1,
    updateDetails: () => {},
    setItems: () => {}
});

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
    const {items: cartItems} = useCart();

    const [promo, setPromo] = useState<PromoCode | null>(null);
    const [details, setDetails] = useState<OrderDetailsValues>({ paymentId: -1, shippingId: -1 })
    const [items, setItems] = useState<CreateOrderItem[]>(
        cartItems.map(item => ({ productId: item.id, quantity: item.count }))
    );

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
                <OrderCheckoutContext.Provider value={{
                    items,
                    ...details,
                    updateDetails: (values: Partial<OrderDetailsValues>) => setDetails({ ...details, ...values }),
                    setItems,
                }}>
                    <section className="w-full sm:w-8/12 lg:w-9/12">
                        <Checkout.OrderInfoCard/>
                        <Checkout.OrderContactsCard/>
                        <Checkout.OrderProductsCard/>
                        <Checkout.OrderDeliveryCard/>
                        <Checkout.OrderPaymentCard/>
                        <Checkout.OrderDetailsCard/>
                    </section>
                </OrderCheckoutContext.Provider>
                <section className="w-full sm:w-4/12 lg:w-3/12 h-fit sm:sticky top-[72px]">
                    <Checkout.OrderPromoCodeCard promo={promo} setPromo={setPromo}/>
                    <Checkout.OrderConfirmationCard/>
                </section>
            </section>
        </CheckoutContainer>
    );
};