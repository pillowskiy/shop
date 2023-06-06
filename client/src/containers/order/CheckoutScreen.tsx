import type {FC} from 'react';
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";

import {Checkout} from "./";

export const CheckoutScreen: FC = () => {
    return (
        <Meta title="Checkout">
            <Main className="min-h-screen-64 h-auto flex justify-center">
                <section className="w-full md:w-full lg:w-[920px] xl:w-[1080px] p-4 flex-col sm:flex-row flex gap-4">
                    <section className="w-full sm:w-8/12 lg:w-9/12">
                        <Checkout.OrderInfoCard />
                        <Checkout.OrderContactsCard />
                        <Checkout.OrderProductsCard />
                        <Checkout.OrderDeliveryCard />
                        <Checkout.OrderPaymentCard />
                        <Checkout.OrderDetailsCard />
                    </section>
                    <section className="w-full sm:w-4/12 lg:w-3/12 h-fit sm:sticky top-[72px]">
                        <Checkout.OrderPromoCodeCard />
                        <Checkout.OrderConfirmationCard />
                    </section>
                </section>
            </Main>
        </Meta>
    );
};