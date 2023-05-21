import type {FC, FormEvent} from 'react';
import {useState} from "react";
import {Textarea} from "@ui/Textarea";
import {Button} from "@ui/Button";
import {Loader2, Send, Star} from "lucide-react";
import {useToast} from "@common/toast/useToast";
import {useProfile} from "@hooks/useProfile";
import {cn} from "@lib/utils";
import ReviewService from "@api/services/review.service";
import {ReviewCreate} from "@types/review.interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {isAxiosError} from "axios";

const STAR_REVIEWS = [
    {
        rate: 1,
        text: "Bad",
    },
    {
        rate: 2,
        text: "So-so",
    },
    {
        rate: 3,
        text: "Not bad",
    },
    {
        rate: 4,
        text: "Good",
    },
    {
        rate: 5,
        text: "Awesome",
    },
]

const INITIAL_ERRORS: ReviewErrors = {
    text: "",
    rating: ""
}

const INITIAL_REVIEW: ReviewCreate = {
    text: '',
    rating: 0,
}

interface ProductReviewFormProps {
    productId: number;
}

type ReviewErrors = Record<keyof ReviewCreate, string>;

export const ProductReviewForm: FC<ProductReviewFormProps> = ({productId}) => {
    const [review, setReview] = useState<ReviewCreate>(INITIAL_REVIEW);
    const [errors, setErrors] = useState<ReviewErrors>(INITIAL_ERRORS);
    const [isLoading, setIsLoading] = useState(false);

    const {toast} = useToast();
    const {profile} = useProfile();

    const queryClient = useQueryClient();
    const {mutate} = useMutation(['create review', productId, profile?.id], () => {
        return ReviewService.create(productId, review);
    }, {
        onSuccess: () => {
            setReview(INITIAL_REVIEW);
            toast({
                description: "✅ Your review has been sent."
            })
            return queryClient.invalidateQueries(['get reviews', productId]);
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                setErrors(err.response.data.errors);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong",
                    description: err.message
                })
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
        if (!profile) {
            toast({
                variant: "destructive",
                title: "Access denied!",
                description: "Only authorized users can use this action."
            });
            return;
        }
        mutate();
    }

    const setReviewRate = (rating: number) => {
        setReview({...review, rating: review.rating === rating ? 0 : rating});
    }

    return (
        <form onSubmit={onSubmit} className="pb-4 border-b" action="">
            <h2 className="text-xl md:text-2xl font-medium mt-2">Review this product</h2>
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
                disabled={isLoading}
            />
            {errors.text && <p className="text-xs text-destructive">{errors.text}</p>}

            <div className="w-full flex justify-between px-4 mt-2 cursor-pointer" aria-disabled={isLoading || !profile}>
                {
                    STAR_REVIEWS.map((el, index) => (
                        <div
                            key={el.rate}
                            onClick={() => setReviewRate(el.rate)}
                        >
                            <Star
                                className={cn("text-warning w-5 h-5 m-auto transition-all md:hover:fill-warning", {
                                    'fill-warning': (review.rating - 1) >= index
                                })}
                            />
                            <p className="text-xs text-primary opacity-90">{el.text}</p>
                        </div>
                    ))
                }
            </div>
            {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}

            <Button type="submit" className="mt-2 w-full" disabled={isLoading || !profile}>
                <p>Send</p>
                {
                    isLoading ?
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>:
                        <Send className="font-normal w-4 h-4 ml-1" />
                }
            </Button>
        </form>
    );
};