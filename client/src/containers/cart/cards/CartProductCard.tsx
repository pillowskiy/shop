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
                <Link href={`/products/${product.slug}`} className="flex">
                    <Image
                        className="w-[96px] h-[96px] rounded-lg object-cover object-top"
                        src={product.images[0]}
                        alt="Product image"
                        width={256}
                        height={256}
                    />
                    <div className="w-7/12 ml-4 cursor-pointer max-h-[64px]">
                        <div className="flex">
                            <p className="hover:underline transition-all">
                                {product.name.length > 22 ? product.name.slice(0, 26).concat("..") : product.name}
                            </p>
                            <QuantityBadge quantity={product.quantity}/>
                        </div>
                        <p className="text-xs">{product.description?.slice(0, 56).concat("..")}</p>
                    </div>
                </Link>
                <Button
                    className="absolute right-0 top-0"
                    variant="secondary"
                    onClick={() => dispatch(removeFromCart(product))}
                >
                    <Trash className="w-6 h-6"/>
                </Button>
            </section>
            <section className="-mt-4 flex justify-between items-end">
                <NumberFormInput
                    type="number"
                    className="w-[96px]"
                    setValue={(step) => setQuantity(prev => prev + step)}
                    onChange={({target}) => setQuantity(+target.value)}
                    value={quantity}
                    step={1}
                    max={product.quantity}
                    min={1}
                />
                <div className="p-2 h-10 flex gap-2 items-center select-none">
                    <h2 className="font-bold text-2xl">{product.price}$</h2>
                    <del className="text-sm text-destructive">300$</del>
                </div>
            </section>
        </Card>
    );
};