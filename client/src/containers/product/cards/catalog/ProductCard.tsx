import {forwardRef} from 'react';
import type {Product} from "@/types/product.interface";

import {StarRating} from "../../layout/StarRating";
import {ProductPrice} from "../../layout/ProductPrice";
import {FavoriteButton} from "../../layout/FavoriteButton";
import {Card, CardContent} from "@common/Card";

import Image from "next/image";
import Link from "next/link";
import {Routes} from "@config";

import {useProductRateAvg} from "@hooks/useProductRateAVG";
import {cn} from "@lib/utils";

import {motion} from "framer-motion";

interface ProductItemProps {
    product: Product;
}

const Product = forwardRef<HTMLDivElement, ProductItemProps>(({product}, ref) => {
    const rating = useProductRateAvg(product.id);

    return (
        <Card
            ref={ref}
            className={cn(
                "flex-card max-w-1/2 lg:max-w-1/3 xl:max-w-[210px] shadow-md rounded-lg bg-popover animate-catalog-mount",
                "hover:scale-[1.01] hover:shadow-xl hover:bg-muted transition-all duration-200 border cursor-pointer"
            )}
        >
            <Link href={`${Routes.Products}/${product.slug}`}>
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
                <Link href={`${Routes.Products}/${product.slug}`}>
                    <p className={cn(
                        "text-sm text-foreground truncate block",
                        "capitalize hover:underline transition-all"
                    )}>{product.name}</p>
                </Link>
                <section className="flex">
                    <ProductPrice size="sm" product={product}/>
                    <FavoriteButton className="ml-auto hidden sm:block" productId={product.id}/>
                </section>
                <StarRating rating={rating} text={rating.toFixed(1)}/>
            </CardContent>
        </Card>
    );
});

Product.displayName = "Product";
const MProduct = motion<ProductItemProps>(Product);
export {Product, MProduct};
