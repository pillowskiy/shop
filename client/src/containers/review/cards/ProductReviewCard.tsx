import type {FC} from 'react';
import {Card} from "@common/Card";
import {analyzeReviews} from "../util";
import {StarRating} from "@containers/product/layout/StarRating";
import {useProductRateAvg} from "@hooks/useProductRateAVG";
import {ReviewComment} from "@containers/review/cards/layout/ReviewComment";
import {ReviewProgressBar} from "@containers/review/cards/layout/ReviewProgressBar";
import {ProductReviewForm} from "@containers/review/forms/ProductReviewForm";
import {EmptyItems} from "@containers/EmptyItems";
import {SortButtons} from "@containers/review/layout/SortButtons";
import {useProfile} from "@hooks/useProfile";
import {ReviewComments} from "@containers/review/layout/ReviewComments";

interface ProductReviewProps {
    productId: number;
}

export const ProductReviewCard: FC<ProductReviewProps> = ({productId}) => {
    const rating = useProductRateAvg(productId);
    const {profile} = useProfile();

    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[920px] xl:w-[1080px] gap-4 p-4 mt-4 bg-popover">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews</h2>
            <section className="mt-2 flex flex-col md:flex-row w-full border-t pt-2">
                <aside className="w-full md:w-1/3">
                    <h2 className="text-xl md:text-2xl font-medium">Customer reviews</h2>
                    <StarRating rating={rating}/>
                    <hr className="mt-4"/>
                    {
                        analyzeReviews([]).map(({intervalCounts, percentages}, index) => (
                            <ReviewProgressBar
                                key={Math.random() * Date.now()}
                                intervalCounts={intervalCounts}
                                percentages={percentages}
                                starCount={index + 1}
                            />
                        ))
                    }
                    <hr className="mt-4"/>
                    <ProductReviewForm productId={productId} hasAccess={!!profile}/>
                </aside>
                <aside className="w-full md:w-2/3 md:ml-4 mt-2 md:mt-0 relative">
                    <ReviewComments productId={productId} hasAccess={!!profile} />
                </aside>
            </section>
        </Card>
    );
};