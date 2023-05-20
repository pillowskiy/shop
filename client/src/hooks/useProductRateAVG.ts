import {useQuery} from "@tanstack/react-query";
import ReviewService from "@api/services/review.service";

export const useProductRateAvg = (productId: number) => {
    const rating = useQuery(['product avg rate', productId], () => {
        return ReviewService.getAvg(productId)
    }, {select: ({data}) => data}).data || 0.00;
    return rating;
}