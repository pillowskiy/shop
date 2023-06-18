import {type FC, type FormEvent, useState} from 'react';
import type {ReviewCreate, ReviewErrors} from "@/types/review.interface";

import {isAxiosError} from "axios";
import {Loader2, Send} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {Textarea} from "@ui/Textarea";
import {Button} from "@ui/Button";

import {useToast} from "@common/toast/useToast";

import {cn} from "@lib/utils";
import ReviewService from "@api/services/review.service";

import {INITIAL_ERRORS, INITIAL_REVIEW, STAR_REVIEWS} from "../constant";
import {StarReview} from "../layout/StarReview";
import {HoverInfoCard} from "@components/HoverInfoCard";

interface ProductReviewFormProps {
    hasAccess: boolean;
    productId: number;
}

export const ProductReviewForm: FC<ProductReviewFormProps> = ({productId, hasAccess}) => {
    const [review, setReview] = useState<ReviewCreate>(INITIAL_REVIEW);
    const [errors, setErrors] = useState<ReviewErrors>(INITIAL_ERRORS);
    const [isLoading, setIsLoading] = useState(false);

    const {toast} = useToast();

    const queryClient = useQueryClient();
    const {mutate} = useMutation(['create review', productId], () => {
        return ReviewService.create(productId, review);
    }, {
        onSuccess: () => {
            setReview(INITIAL_REVIEW);
            toast({
                description: "✅ Your review has been sent."
            });
            return queryClient.invalidateQueries(['get reviews', productId]);
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                setErrors(err.response?.data.errors);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong",
                    description: "Unhandled error"
                });
            }
        },
        onSettled: () => {
            setTimeout(() => setIsLoading(false), 600);
        }
    });


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors(INITIAL_ERRORS);
        mutate();
    }

    const setReviewRate = (rating: number) => {
        setReview({...review, rating: review.rating === rating ? 0 : rating});
    }

    return (
        <form onSubmit={onSubmit} className="pb-4 border-b">
            <h2 className="text-xl md:text-2xl font-medium">Review this product</h2>
            <p className="text-primary opacity-90">Share your thoughts with other customers</p>
            <Textarea
                className={cn("mt-4 bg-white", {
                    'border-destructive': errors.text
                })}
                value={review.text}
                onChange={({target}) => setReview({ ...review, text: target.value})}
                placeholder="Start entering comments here."
                maxLength={1024}
                required
                disabled={isLoading || !hasAccess}
            />
            {errors.text && <p className="text-xs text-destructive">{errors.text}</p>}

            <div className="w-full flex justify-between px-4 mt-2 cursor-pointer" aria-disabled={isLoading || !hasAccess}>
                {
                    STAR_REVIEWS.map((el, index) => (
                        <StarReview
                            key={el.rate}
                            onClick={() => setReviewRate(el.rate)}
                            isFill={(review.rating - 1) >= index}
                            text={el.text}
                        />
                    ))
                }
            </div>
            {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}

            <HoverInfoCard
                title="Publishing a review"
                description="You do not have permission to post a review on this product"
                disabled={hasAccess}
            >
                <div>
                    <Button type="submit" className="mt-2 w-full" disabled={isLoading || !hasAccess}>
                        <p>Send</p>
                        {
                            isLoading ?
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>:
                                <Send className="font-normal w-4 h-4 ml-1" />
                        }
                    </Button>
                </div>
            </HoverInfoCard>
        </form>
    );
};