import type {FC} from 'react';
import {ProductFullest} from "@types/product.interface";
import {Card} from "@common/Card";
import {ProductRating} from "@containers/product/ProductRating";
import {Progress} from "@ui/Progress";
import {analyzeReviews} from "@lib/utils";
import {Textarea} from "@ui/Textarea";
import {Button} from "@ui/Button";
import {Send} from "lucide-react";

interface ProductReviewProps {
    product: ProductFullest;
}

export const ProductReview: FC<ProductReviewProps> = ({product}) => {
    return (
        <Card className="w-full sm:w-[520px] md:w-full lg:w-[1080px] gap-4 p-4 mt-4 bg-popover">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews</h2>
            <section className="mt-4 flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/3">
                    <h2 className="text-xl md:text-2xl font-medium">Customer reviews</h2>
                    <ProductRating product={product} className="flex gap-2 justify-start"/>

                    <hr className="mt-4"/>

                    {
                        analyzeReviews(product.reviews).map((review, index) => (
                            <div key={Math.random() * Date.now()} className="flex items-center gap-2 w-full mt-2">
                                <p className="w-[60px]">{index + 1} star</p>
                                <Progress className="rounded-md border" value={review.percentages}/>
                                <p className="w-[60px]">{review.percentages}%</p>
                            </div>
                        ))
                    }

                    <hr className="mt-4"/>

                    <form action="">
                        <h2 className="text-xl md:text-2xl font-medium mt-2">Review this product</h2>
                        <p className="text-primary opacity-90">Share your thoughts with other customers</p>
                        <Textarea className="mt-4 bg-white" placeholder="Start entering comments here." />
                        <Button type="submit" className="mt-2 w-full">
                            <p>Send</p>
                            <Send className="font-normal w-4 h-4 ml-1" />
                        </Button>
                    </form>
                </div>
                <div className="w-full md:w-2/3">

                </div>
            </section>
        </Card>
    );
};