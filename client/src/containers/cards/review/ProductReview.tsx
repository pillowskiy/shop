import type {FC} from 'react';
import type {ProductFullest} from "@/types/product.interface";
import {Card} from "@common/Card";
import {analyzeReviews} from "@lib/utils";
import {Button} from "@ui/Button";
import {StarRating} from "@containers/product/StarRating";
import {useProductRateAvg} from "@hooks/useProductRateAVG";
import {ReviewComment} from "@containers/cards/review/layout/ReviewComment";
import {ReviewProgressBar} from "@containers/cards/review/layout/ReviewProgressBar";
import {ProductReviewForm} from "@containers/cards/review/layout/ProductReviewForm";

interface ProductReviewProps {
    product: ProductFullest;
}

export const ProductReview: FC<ProductReviewProps> = ({product}) => {
    const rating = useProductRateAvg(product.id);
    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[1080px] gap-4 p-4 mt-4 bg-popover">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews ({product.reviews.length})</h2>
            <section className="mt-2 flex flex-col md:flex-row w-full border-t pt-2">
                <aside className="w-full md:w-1/3">
                    <h2 className="text-xl md:text-2xl font-medium">Customer reviews</h2>
                    <StarRating rating={rating} />
                    <hr className="mt-4"/>
                    {
                        analyzeReviews(product.reviews).map(({intervalCounts, percentages}, index) => (
                            <ReviewProgressBar
                                key={Math.random() * Date.now()}
                                intervalCounts={intervalCounts}
                                percentages={percentages}
                                starCount={index + 1}
                            />
                        ))
                    }
                    <hr className="mt-4"/>
                    <ProductReviewForm />
                </aside>
                <aside className="w-full md:w-2/3 md:ml-4 mt-2 md:mt-0">
                    <section className="mt-2 mb-4 flex gap-2 bg-muted p-2 rounded-md">
                        <Button className="h-8" variant="default" disabled>Newest</Button>
                        <Button className="h-8" variant="secondary">Oldest</Button>
                        <Button className="h-8" variant="secondary">Better</Button>
                        <Button className="h-8" variant="secondary">Worse</Button>
                    </section>
                    {product.reviews.map(review => (
                        <ReviewComment key={Date.now() * Math.random()} review={review} />
                    ))}
                </aside>
            </section>
        </Card>
    );
};