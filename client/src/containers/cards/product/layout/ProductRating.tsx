import type {FC} from 'react';
import {Star} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {ProductFullest} from "@/types/product.interface";
import ReviewService from "@api/services/review.service";

interface ProductRatingProps {
    product: ProductFullest;
}

export const ProductRating: FC<ProductRatingProps> = ({
    product,
}) => {
    const rating = useQuery(['product avg rate', product.id], () => {
        return ReviewService.getAvg(product.id)
    }, {select: ({data}) => data}).data || 0.00;

    return (
        <div className="flex justify-between w-full">
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 opacity-70"/>
                <p className="text-base text-foreground opacity-90">{rating.toFixed(2)}</p>
            </div>
            <p className="text-base text-primary">{product.reviews.length} reviews</p>
        </div>
    );
};