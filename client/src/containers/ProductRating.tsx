import type {FC, HTMLAttributes} from 'react';
import {Star} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {ProductFullest} from "@/types/product.interface";
import ReviewService from "@api/services/review.service";
import {cn} from "@lib/utils";

interface ProductRatingProps extends HTMLAttributes<HTMLDivElement> {
    product: ProductFullest;
}

export const ProductRating: FC<ProductRatingProps> = ({
    product,
    className,
    ...props
}) => {
    const rating = useQuery(['product avg rate', product.id], () => {
        return ReviewService.getAvg(product.id)
    }, {select: ({data}) => data}).data || 0.00;

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