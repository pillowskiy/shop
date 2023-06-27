import type {FC} from 'react';
import {CartDialog} from "@containers/cart/dialogs/CartDialog";
import {Edit} from "lucide-react";
import {useCart} from "@hooks/useCart";
import {CartReadonlyItemCard} from "@containers/cart/cards/CartReadonlyItemCard";

import {opacityListAnimation} from "@lib/animations";
import {MCard} from "@common/Card";

export const OrderProductsCard: FC = () => {
    const {items} = useCart();

    return (
        <MCard
            className="bg-popover p-4 mt-4"
            initial="initial"
            animate="animate"
            custom={2}
            variants={opacityListAnimation}
        >
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-xl mb-2">Products:</h2>
                <CartDialog>
                    <div className="flex text-primary opacity-90 cursor-pointer md:hover:underline transition-all">
                        <Edit className="w-5 h-5 mr-1"/>
                        <p>Edit</p>
                    </div>
                </CartDialog>
            </div>

            <section className="relative rounded-lg max-h-[400px] overflow-y-auto">
                {
                    items.map(item => (
                        <CartReadonlyItemCard key={item.product.id} item={item} />
                    ))
                }
            </section>
        </MCard>
    );
};