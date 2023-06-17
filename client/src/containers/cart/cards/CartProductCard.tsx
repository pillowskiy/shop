import type {FC} from 'react';
import type {CartItem} from "@/types";
import {Card} from "@common/Card";
import Image from "next/image";
import {QuantityBadge} from "@containers/product/layout/QuantityBadge";
import {Trash} from "lucide-react";
import {NumberFormInput} from "@components/NumberFormInput";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@ui/Button";
import {useAppDispatch} from "@redux/store";
import {removeFromCart, updateCart} from "@redux/cart/cart.slice";
import {useDebounce} from "@hooks/useDebounce";
import {priceFormat} from "@lib/formatter";
import {ProductHorizontalInfo} from "@containers/product/cards/overview/layout/ProductHorizontalInfo";
import {ProductPrice} from "@containers/product/layout/ProductPrice";

interface CartProductCardProps {
    product: CartItem;
}

export const CartProductCard: FC<CartProductCardProps> = ({product}) => {
    const [quantity, setQuantity] = useState(product.count);
    const {debounce} = useDebounce(quantity, 1000);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debounce === quantity) {
            dispatch(updateCart({ ...product, count: quantity }));
        }
    }, [debounce]);

    return (
        <Card className="p-2 h-fit w-full mb-4">
            <section className="relative w-full">
                <ProductHorizontalInfo product={product} />
                <Button
                    className="absolute right-0 top-0"
                    variant="secondary"
                    onClick={() => dispatch(removeFromCart(product))}
                >
                    <Trash className="w-6 h-6"/>
                </Button>
            </section>
            <section className="-mt-2 flex justify-between items-end">
                <NumberFormInput
                    type="number"
                    className="w-[72px] md:w-[96px]"
                    setValue={(step) => setQuantity(prev => prev + step)}
                    onChange={({target}) => setQuantity(+target.value)}
                    value={quantity}
                    step={1}
                    max={product.quantity > 10 ? 10 : product.quantity}
                    min={1}
                />
                <div className="p-2 h-10 flex space-x-2 items-center select-none">
                    <ProductPrice size="lg" product={product} />
                </div>
            </section>
        </Card>
    );
};