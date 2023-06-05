import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import {Card, CardContent} from "@common/Card";
import {FavoriteButton} from "../../layout/FavoriteButton";
import Image from "next/image";
import {cn} from "@lib/utils";;
import Link from "next/link";
import {priceFormat} from "@lib/formatter";

interface ProductItemProps {
    product: ProductFullest;
}

export const ProductCard: FC<ProductItemProps> = ({product}) => {
    return (
        <Card
            className={cn(
                "flex-card max-w-1/2 lg:max-w-1/3 xl:max-w-[210px] shadow-md rounded-lg bg-popover",
                "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border cursor-pointer"
            )}
        >
            <Link href={`/products/${product.slug}`}>
                <Image
                    className="w-full h-auto aspect-square object-cover object-top rounded-t-lg"
                    width={360}
                    height={360}
                    loading="lazy"
                    src={product.images[0]}
                    alt={product.name}
                />
            </Link>

            <CardContent className="px-custom md:px-4 py-3 w-full">
                <Link href={`/products/${product.slug}`}>
                    <p
                        className="text-sm text-foreground truncate block capitalize hover:underline transition-all"
                    >
                        {product.name}
                    </p>
                </Link>
                <section className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto py-1">{priceFormat(product.price)}</p>
                    <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del>
                    <FavoriteButton className="block ml-auto" productId={product.id}/>
                </section>
            </CardContent>
        </Card>
    );
};