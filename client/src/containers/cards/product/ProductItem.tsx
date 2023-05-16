import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import {Card, CardContent} from "@common/Card";
import {FavoriteButton} from "./layout/FavoriteButton";
import {ProductRating} from "./layout/ProductRating";
import Image from "next/image";
import {cn} from "@lib/utils";

interface ProductItemProps {
    product: ProductFullest;
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    return (
        <Card
            className={
                cn(
                    "flex-card max-w-1/2 lg:max-w-1/3 xl:max-w-none shadow-md rounded-lg bg-popover",
                    "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border cursor-pointer"
                )
            }
        >
            <Image
                className="w-full h-auto object-cover rounded-t-lg"
                width={360}
                height={360}
                loading="lazy"
                src={product.images[0]}
                alt={product.name}
            />

            <CardContent className="px-custom md:px-4 py-3 w-full">
                <span className="text-muted uppercase text-xs">{product.category.name}</span>
                <p className="text-sm text-foreground truncate block capitalize">{product.name}</p>
                <section className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto py-1">{product.price}$</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del>
                    <FavoriteButton className="block ml-auto" productId={product.id}/>
                </section>
                <ProductRating product={product}/>
            </CardContent>
        </Card>
    );
};