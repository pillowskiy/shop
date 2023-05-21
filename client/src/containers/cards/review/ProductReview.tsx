import type {FC} from 'react';
import {Card} from "@common/Card";
import {analyzeReviews} from "@lib/utils";
import {StarRating} from "@containers/product/StarRating";
import {useProductRateAvg} from "@hooks/useProductRateAVG";
import {ReviewComment} from "@containers/cards/review/layout/ReviewComment";
import {ReviewProgressBar} from "@containers/cards/review/layout/ReviewProgressBar";
import {ProductReviewForm} from "@containers/cards/review/layout/ProductReviewForm";
import {useQuery} from "@tanstack/react-query";
import ReviewService from "@api/services/review.service";
import {EmptyItems} from "@containers/EmptyItems";
import {SortButtons} from "@containers/cards/review/layout/SortButtons";

interface ProductReviewProps {
    productId: number;
}

export const ProductReview: FC<ProductReviewProps> = ({productId}) => {
    const {data: reviews} = useQuery(['get reviews', productId], () => {
        return ReviewService.getById(productId);
    }, {
        select: ({data}) => data,
    });

    const rating = useProductRateAvg(productId);
    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] gap-4 p-4 mt-4 bg-popover">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews ({reviews?.length || 0})</h2>
            <section className="mt-2 flex flex-col md:flex-row w-full border-t pt-2">
                <aside className="w-full md:w-1/3">
                    <h2 className="text-xl md:text-2xl font-medium">Customer reviews</h2>
                    <StarRating rating={rating}/>
                    <hr className="mt-4"/>
                    {
                        analyzeReviews(reviews || []).map(({intervalCounts, percentages}, index) => (
                            <ReviewProgressBar
                                key={Math.random() * Date.now()}
                                intervalCounts={intervalCounts}
                                percentages={percentages}
                                starCount={index + 1}
                            />
                        ))
                    }
                    <hr className="mt-4"/>
                    <ProductReviewForm productId={productId}/>
                </aside>
                <aside className="w-full md:w-2/3 md:ml-4 mt-2 md:mt-0 relative">
                    {
                        reviews?.length ? (
                            <>
                                <SortButtons/>
                                {reviews.map(review => (
                                    <ReviewComment key={Date.now() * Math.random()} review={review}/>
                                ))}
                            </>
                        ) : <EmptyItems className="hidden md:block lg:top-[40%]">There are not reviews yet.</EmptyItems>
                    }
                </aside>
            </section>
        </Card>
    );
};