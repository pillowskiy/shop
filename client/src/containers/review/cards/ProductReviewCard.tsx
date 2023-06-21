import type {FC} from 'react';
import {Card} from "@common/Card";
import {StarRating} from "@containers/product/layout/StarRating";
import {useProductRateAvg} from "@hooks/useProductRateAVG";
import {ReviewProgressBar} from "@containers/review/cards/layout/ReviewProgressBar";
import {ProductReviewForm} from "@containers/review/forms/ProductReviewForm";
import {useProfile} from "@hooks/useProfile";
import {ReviewComments} from "@containers/review/layout/ReviewComments";
import {useQuery} from "@tanstack/react-query";
import ReviewService from "@api/services/review.service";
import {Loader} from "@containers/Loader";
import {Skeleton} from "@ui/Skeleton";

interface ProductReviewProps {
    productId: number;
}

export const ProductReviewCard: FC<ProductReviewProps> = ({productId}) => {
    const {profile} = useProfile();

    const {data: reviewStatistic, isLoading} = useQuery(['get review statistic', productId], () => {
        return ReviewService.getStatistic(productId);
    }, {
        select: ({data}) => data,
    })

    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] gap-4 p-4 mt-4 bg-popover">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews</h2>
            <section className="mt-2 flex flex-col md:flex-row w-full border-t pt-2">
                <aside className="w-full md:w-1/3">
                    <h2 className="text-xl md:text-2xl font-medium">Customer reviews</h2>
                    <StarRating rating={reviewStatistic?.avg || 0}/>
                    <hr className="my-4"/>
                    {   (reviewStatistic && !isLoading) ?
                        reviewStatistic.intervalCounts.map(({intervalCounts, percentages, rate}) => (
                            <ReviewProgressBar
                                key={rate}
                                intervalCounts={intervalCounts}
                                percentages={percentages}
                                starCount={rate}
                            />
                        )) : Array.from({length: 5}, (_, index) => (
                            <div key={index} className="mt-4 flex justify-between space-x-4">
                                <Skeleton className="w-[48px] h-4"/>
                                <Skeleton className="rounded-lg h-4 w-full"/>
                                <Skeleton className="w-[64px] h-4"/>
                            </div>
                        ))
                    }
                    <hr className="my-4"/>
                    <ProductReviewForm productId={productId} hasAccess={!!profile}/>
                </aside>
                <aside className="w-full md:w-2/3 md:ml-4 mt-2 md:mt-0 relative">
                    <ReviewComments productId={productId} hasAccess={!!profile} />
                </aside>
            </section>
        </Card>
    );
};