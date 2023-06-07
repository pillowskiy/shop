import type {FC} from 'react';
import type {Order, OrderItem} from "@/types/order.interface";
import {useProfile} from "@hooks/useProfile";
import {priceFormat} from "@lib/formatter";
import {Button} from "@ui/Button";
import {Package} from "lucide-react";
import {CartProductCard} from "@containers/cart/cards/CartProductCard";
import {Accordion} from "@radix-ui/react-accordion";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@common/Accordion";

interface OrderDetailedInfoProps {
    order: Order;
    items: OrderItem[]
}

export const OrderDetailedInfo: FC<OrderDetailedInfoProps> = ({order, items}) => {
    const {profile} = useProfile();

    if (!profile) return null;

    const price = items.reduce((prev, cur) => prev + cur.price, 0);

    return (
        <main className="flex flex-col sm:flex-row gap-4 mt-4">
            <section className="w-full md:w-4/12 px-2">
                <h2 className="font-medium text-xl select-none">Order information</h2>
                <hr className="my-2"/>

                {/*     TEMP    */}
                <article className="py-1.5 border-b">
                    <div className="flex items-center">
                        <Package className="w-5 h-5 mr-1 text-primary opacity-90"/>
                        <p>Courier to your address</p>
                    </div>
                    <p className="text-primary opacity-90 text-sm">
                        9794 South Street. London. NW15 7LJ
                    </p>
                </article>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <p className="font-medium">Name:</p>
                        <p className="text-primary opacity-90">{profile.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Phone:</p>
                        <p className="text-primary opacity-90">{profile.phone || "Phone number is missing"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Email:</p>
                        <p className="text-primary opacity-90">{profile.email}</p>
                    </div>
                </div>
            </section>
            <section className="w-full md:w-8/12 px-2">
                <h2 className="font-medium text-xl select-none">Items ({items.length})</h2>
                <hr className="my-2"/>

                <Accordion type="single" collapsible>
                    <AccordionItem className="mb-4" value="description">
                        <AccordionTrigger>Show items</AccordionTrigger>
                        <AccordionContent className="max-h-[300px] overflow-y-auto rounded-lg p-4 pb-0 my-4 border">
                            {
                                items.map(item => (
                                    <CartProductCard key={item.id} product={{...item.product, count: item.quantity}} />
                                ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/*     TEMP    */}
                <div className="flex justify-between">
                    <p className="font-medium">Payment:</p>
                    <p className="text-primary opacity-90">Magic Card</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium">Delivery:</p>
                    <p className="text-primary opacity-90">at the carrier tariffs</p>
                </div>
                <div className="flex text-lg justify-between mt-2">
                    <p className="font-medium">Amount:</p>
                    <p className="underline">{priceFormat(price)}</p>
                </div>

                <div className="flex gap-2 md:gap-4 flex-col md:flex-row mt-4">
                    <Button className="w-full md:w-auto" variant="secondary" disabled>Leave a review</Button>
                    <Button className="w-full md:w-auto">Repeat the order</Button>
                </div>
            </section>
        </main>
    );
};