import type {FC, HTMLAttributes} from 'react';
import type {Product} from "@/types/product.interface";
import {cn} from "@lib/utils";
import {priceFormat} from "@lib/formatter";

type PriceSize = "sm" | "md" | "lg" | "xl"

interface ProductPriceProps extends HTMLAttributes<HTMLDivElement> {
    size: PriceSize,
    product: Product;
}

const PRICE_FONT: Record<PriceSize, {parent: string, child: string}> = {
    sm: {
        parent: "text-base",
        child: "text-sm"
    },
    md: {
        parent: "text-lg",
        child: "text-base"
    },
    lg: {
        parent: "text-xl sm:text-2xl",
        child: "text-base sm:text-lg"
    },
    xl: {
        parent: "text-3xl sm:text-5xl",
        child: "text-xl sm:text-3xl"
    },
} as const;

export const ProductPrice: FC<ProductPriceProps> = ({product, size, className, ...props}) => {
    return (
        <div className={cn("flex space-x-1.5 items-start font-medium", className, PRICE_FONT[size].parent)} {...props}>
            <p>{priceFormat(product.finalPrice)}</p>
            {!!product.discountPercent && (
                <del className={cn("text-destructive opacity-80", PRICE_FONT[size].child)}>
                    {priceFormat(product.price)}
                </del>
            )}
        </div>
    );
};