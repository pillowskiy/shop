import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import Link from "next/link";
import Image from "next/image";
import {QuantityBadge} from "@containers/product/layout/QuantityBadge";

interface ProductHorizontalInfoProps {
    product: Product;
}

export const ProductHorizontalInfo: FC<ProductHorizontalInfoProps> = ({product}) => {
    return (
        <Link className="flex w-9/12 h-[inherit] items-center" href={`/products/${product.slug}`}>
            <div className="h-[96px] w-[96px] flex justify-center bg-white rounded-lg md:rounded-l-lg md:rounded-r-none">
                <Image
                    className="rounded-[inherit] h-full w-auto md:h-full md:w-auto cursor-pointer object-cover object-top"
                    src={product.images[0]}
                    alt={"product image"}
                    width={128}
                    height={128}
                />
            </div>
            <div className="w-7/12 ml-4 absolute left-[64px] md:static cursor-pointer max-h-[64px]">
                <div className="flex">
                    <p className="hover:underline transition-all">
                        {product.name.length > 22 ? product.name.slice(0, 26).concat("..") : product.name}
                    </p>
                    <QuantityBadge quantity={product.quantity}/>
                </div>
                <p className="text-xs">{product.description?.slice(0, 56).concat("..")}</p>
            </div>
        </Link>
    );
};