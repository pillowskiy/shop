import type {FC} from 'react';
import type {CartItem} from "@/types";
import {Card} from "@common/Card";
import {Trash} from "lucide-react";
import {NumberFormInput} from "@components/NumberFormInput";
import {useEffect, useState} from "react";
import {Button} from "@ui/Button";
import {useAppDispatch} from "@redux/store";
import {removeFromCart, updateCartItem} from "@redux/cart/cart.slice";
import {useDebounce} from "@hooks/useDebounce";
import {ProductHorizontalInfo} from "@containers/product/cards/ProductHorizontalInfo";
import {ProductPrice} from "@containers/product/layout/ProductPrice";
import {CartFullestItem} from "@types/cart.interface";

interface CartProductCardProps {
    item: CartFullestItem;
}

export const CartProductCard: FC<CartProductCardProps> = ({item}) => {
    const [quantity, setQuantity] = useState(item.count);
    const {debounce} = useDebounce(quantity, 1000);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debounce === quantity) {
            dispatch(updateCartItem({ productId: item.productId, count: quantity }));
        }
    }, [debounce]);

    return (
        <Card className="p-2 h-fit w-full mb-4">
            <section className="relative w-full">
                <ProductHorizontalInfo product={item.product} />
                <Button
                    className="absolute right-0 top-0 p-2"
                    variant="secondary"
                    onClick={() => dispatch(removeFromCart(item.product))}
                >
                    <Trash className="h-4 w-6 md:h-6 md:w-6"/>
                </Button>
            </section>
            <section className="-mt-2 flex justify-between items-end">
                <NumberFormInput
                    type="number"
                    className="w-[72px] md:w-[96px]"
                    setValue={setQuantity}
                    value={quantity}
                    step={1}
                    max={item.product.quantity > 10 ? 10 : item.product.quantity}
                    min={1}
                />
                <div className="p-2 h-10 flex space-x-2 items-center select-none">
                    <ProductPrice size="lg" product={item.product} />
                </div>
            </section>
        </Card>
    );
};