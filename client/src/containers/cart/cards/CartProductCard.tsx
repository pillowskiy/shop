import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import {Card} from "@common/Card";
import Image from "next/image";
import {QuantityBadge} from "@containers/product/layout/QuantityBadge";
import {Trash} from "lucide-react";
import {NumberFormInput} from "@components/NumberFormInput";
import {useState} from "react";
import Link from "next/link";
import {Button} from "@ui/Button";
import {useAppDispatch} from "@redux/store";
import {removeFromCart} from "@redux/cart/cart.slice";

interface CartProductCardProps {
    product: Product;
}

export const CartProductCard: FC<CartProductCardProps> = ({product}) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();

    return (
        <Card className="p-2 h-fit w-full">
            <section className="relative w-full">
                <Link href={`/products/${product.slug}`} className="flex">
                    <Image
                        className="w-[96px] h-[96px] rounded-lg"
                        src={product.images[0]}
                        alt="Product image"
                        width={256}
                        height={256}
                    />
                    <div className="w-7/12 ml-4 left-[64px] cursor-pointer max-h-[64px]">
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
                    productId={product.id}
                    variant="secondary"
                    onClick={() => dispatch(removeFromCart(product))}
                >
                    <Trash className="w-6 h-6"/>
                </Button>
            </section>
            <section className="-mt-4 flex justify-between items-end">
                <NumberFormInput
                    className="w-[96px]"
                    setValue={(step) => setQuantity(prev => prev + step)}
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