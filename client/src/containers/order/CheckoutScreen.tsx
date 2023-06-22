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
import {CreateShippingData} from "@types/shipping.interface";
import {INITIAL_SHIPPING_DATA} from "@containers/shipping/constant";

export const OrderCheckoutContext = createContext<CheckoutOrderContext>({
    items: [],
    shippingId: -1,
    updateDetails: () => {
    },
    setItems: () => {
    }
});

type ShippingErrors = Partial<Record<keyof CreateShippingData, string>>;
export const OrderShippingContext = createContext<{
    data: CreateShippingData,
    setData: (newValue: CreateShippingData) => void,
    errors: ShippingErrors,
    setErrors: (newErrors: ShippingErrors) => void,
}>({
    data: INITIAL_SHIPPING_DATA,
    setData: () => {},
    errors: {},
    setErrors: () => {},
})

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

    const [shipping, setShipping] = useState<CreateShippingData>(INITIAL_SHIPPING_DATA);
    const [shippingErrors, setShippingErrors] = useState<ShippingErrors>({});
    const [details, setDetails] = useState<OrderDetailsValues>({shippingId: -1});

    const [items, setItems] = useState<CreateOrderItem[]>(
        cartItems.map(item => ({productId: item.id, quantity: item.count}))
    );

    if (!cartItems.length) {
        return (
            <CheckoutContainer>
                <EmptyItems>You have no items in your cart.</EmptyItems>
            </CheckoutContainer>
        )
    }

    return (
        <CheckoutContainer>
            <OrderCheckoutContext.Provider value={{
                items,
                ...details,
                updateDetails: (values: Partial<OrderDetailsValues>) => setDetails({...details, ...values}),
                setItems,
            }}>
                <OrderShippingContext.Provider value={{
                    data: shipping,
                    setData: setShipping,
                    errors: shippingErrors,
                    setErrors: setShippingErrors
                }}>
                    <section className="w-full md:w-full lg:w-[920px] xl:w-[1080px] sm:p-4 flex-col sm:flex-row flex gap-4">
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
                            <Checkout.OrderConfirmationCard promo={promo}/>
                        </section>
                    </section>
                </OrderShippingContext.Provider>
            </OrderCheckoutContext.Provider>
        </CheckoutContainer>
    );
};