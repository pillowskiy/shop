import type {FC, HTMLAttributes} from 'react';
import {Star} from "lucide-react";
import {ProductFullest} from "@/types/product.interface";
import {cn} from "@lib/utils";
import {useProductRateAvg} from "@hooks/useProductRateAVG";

interface ProductRatingProps extends HTMLAttributes<HTMLDivElement> {
    product: ProductFullest;
}

export const ProductRating: FC<ProductRatingProps> = ({
    product,
    className,
    ...props
}) => {
    const rating = useProductRateAvg(product.id);

    return (
        <div className={cn("flex justify-between w-full", className)} {...props}>
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 opacity-70"/>
                <p className="text-base text-foreground opacity-90">{rating.toFixed(2)}</p>
            </div>
            <p className="text-base text-primary">({product.reviews.length} reviews)</p>
        </div>
    );
};