import type {FC} from 'react';
import {CartDialog} from "@containers/cart/dialogs/CartDialog";
import {Edit} from "lucide-react";
import {Card} from "@common/Card";
import {cn} from "@lib/utils";
import {ProductHorizontalInfo} from "@containers/product/cards/overview/layout/ProductHorizontalInfo";
import {useCart} from "@hooks/useCart";
import {priceFormat} from "@lib/formatter";

export const OrderProductsCard: FC = () => {
    const {items} = useCart();

    return (
        <Card className="bg-popover p-4 mt-4">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-xl mb-2">Products:</h2>
                <CartDialog>
                    <div className="flex text-primary opacity-90 cursor-pointer md:hover:underline transition-all">
                        <Edit className="w-5 h-5 mr-1"/>
                        <p>Edit</p>
                    </div>
                </CartDialog>
            </div>

            <section className="relative flex flex-col gap-4 rounded-lg max-h-[400px] overflow-y-auto">
                {
                    items.map(item => (
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
                    ))
                }
            </section>
        </Card>
    );
};