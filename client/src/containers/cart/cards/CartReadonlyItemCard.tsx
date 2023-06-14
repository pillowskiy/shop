import type {FC} from 'react';
import {Card} from "@common/Card";
import {cn} from "@lib/utils";
import {ProductHorizontalInfo} from "@containers/product/cards/overview/layout/ProductHorizontalInfo";
import {priceFormat} from "@lib/formatter";
import {CartItem} from "@/types";

interface CartReadonlyItemCardProps {
    item: CartItem
}

export const CartReadonlyItemCard: FC<CartReadonlyItemCardProps> = ({item}) => {
    return (
        <Card
            key={item.id}
            className={cn(
                "bg-white hover:bg-muted hover:shadow-lg transition-all min-w-[260px] w-full",
                "relative flex flex-col lg:flex-row lg:justify-between lg:items-center shadow-md p-2 lg:p-0"
            )}
        >
            <ProductHorizontalInfo product={item}/>
            <section className="flex justify-between px-2">
                <div className="py-2 text-center px-4">
                    <h2 className="text-lg leading-5">{priceFormat(item.price)}</h2>
                    <p className="text-xs leading-3 m-auto text-primary opacity-90">Price</p>
                </div>
                <div className="py-2 text-center px-4">
                    <h2 className="text-lg leading-5">{item.count}</h2>
                    <p className="text-xs leading-3 m-auto text-primary opacity-90">Item(s)</p>
                </div>
                <div className="py-2 text-center px-4">
                    <h2 className="text-lg leading-5">{priceFormat(item.count * item.price)}</h2>
                    <p className="text-xs leading-3 m-auto text-primary opacity-90">Amount</p>
                </div>
            </section>
        </Card>
    );
};