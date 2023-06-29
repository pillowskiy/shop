import type {FC} from 'react';
import type {Product} from "@/types/product.interface";
import {QuantityBadge} from "@containers/product/layout/QuantityBadge";

import Link from "next/link";
import Image from "next/image";
import {Routes} from "@config";

interface ProductHorizontalInfoProps {
    product: Product;
}

export const ProductHorizontalInfo: FC<ProductHorizontalInfoProps> = ({product}) => {
    return (
        <Link className="flex w-full md:w-11/12 h-[inherit] items-center" href={`${Routes.Products}/${product.slug}`}>
            <section className="h-[72px] w-[72px] md:h-[96px] md:w-[96px] flex justify-center bg-white rounded-lg">
                <Image
                    className="rounded-[inherit] h-full w-full cursor-pointer object-cover object-top"
                    src={product.images[0]}
                    alt={"product image"}
                    width={128}
                    height={128}
                />
            </section>
            <section className="md:w-8/12 ml-2 sm:ml-4 md:static cursor-pointer max-h-[72px]">
                <div className="flex">
                    <p className="hover:underline transition-all">
                        {product.name.length > 22 ? product.name.slice(0, 24).concat("..") : product.name}
                    </p>
                    <QuantityBadge quantity={product.quantity}/>
                </div>
                <p className="text-xs hidden md:block">{product.description?.slice(0, 48).concat("..")}</p>
            </section>
        </Link>
    );
};