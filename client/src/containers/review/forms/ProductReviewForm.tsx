import {type FC, type FormEvent, useState} from 'react';
import type {ReviewCreate, ReviewErrors} from "@/types/review.interface";

import {Loader2, Image as ImageIcon, Send, MoreHorizontal} from "lucide-react";
import {Textarea} from "@ui/Textarea";
import {Button} from "@ui/Button";
import Image from "next/image";

import {StarReview} from "../layout/StarReview";
import {HoverInfoCard} from "@components/HoverInfoCard";
import {DropdownMenuContent, DropdownMenu, DropdownMenuTrigger} from "@common/DropdownMenu";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReviewService from "@api/services/review.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";

import {INITIAL_ERRORS, INITIAL_REVIEW, STAR_REVIEWS} from "../constant";
import {cn} from "@lib/utils";

interface ProductReviewFormProps {
    hasAccess: boolean;
    productId: number;
}

export const ProductReviewForm: FC<ProductReviewFormProps> = ({productId, hasAccess}) => {
    const [attachments, setAttachments] = useState<{ preview: string, file: File }[]>([]);
    const [review, setReview] = useState<ReviewCreate>(INITIAL_REVIEW);
    const [errors, setErrors] = useState<ReviewErrors>(INITIAL_ERRORS);
    const [isLoading, setIsLoading] = useState(false);

    const {toast} = useToast();

    const queryClient = useQueryClient();
    const {mutate} = useMutation(['create review', productId], ({formData}: {formData: FormData}) => {
        return ReviewService.create(productId, formData);
    }, {
        onSuccess: () => {
            setReview(INITIAL_REVIEW);
            toast(buildToast("review.post.success").toast);
            return queryClient.invalidateQueries(['get reviews', productId]);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            const errors = err.response?.data?.errors
            if (errors) {
                setErrors(errors);
            } else {
                toast(buildToast("error", {
                    error: err.response?.data?.message || "Unhandled error occurred"
                }).toast);
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

        const formData = new FormData();
        attachments.forEach(({file}) => {
            formData.append('files[]', file);
        });

        Object.entries(review).forEach(([key, value]) => {
            formData.append(key, value.toString());
        })

        mutate({formData});
    }

    const setReviewRate = (rating: number) => {
        setReview({...review, rating: review.rating === rating ? 0 : rating});
    }

    return (
        <form onSubmit={onSubmit} className="pb-4 border-b">
            <h2 className="text-xl md:text-2xl font-medium">Review this product</h2>
            <p className="text-primary opacity-90">Share your thoughts with other customers</p>
            <section className="relative">
                <Textarea
                    className={cn("mt-4 bg-white h-[120px]", {
                        'border-destructive': errors.text
                    })}
                    value={review.text}
                    onChange={({target}) => setReview({...review, text: target.value})}
                    placeholder="Start entering comments here."
                    maxLength={1024}
                    required
                    disabled={isLoading || !hasAccess}
                />
                <DropdownMenu modal>
                    <DropdownMenuTrigger className="absolute top-0 right-0 p-2 cursor-pointer text-muted-foreground">
                        <MoreHorizontal className="w-5 h-5"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div
                            className="px-2 py-1 transition-all hover:bg-muted-foreground rounded-md hover:text-white cursor-pointer">
                            <input
                                id="files"
                                onChange={({target}) => {
                                    if (!target.files?.length) return;
                                    const newImages = Array.from(target.files, (file => ({
                                        preview: URL.createObjectURL(file),
                                        file,
                                    })))
                                    setAttachments([...attachments, ...newImages])
                                }}
                                className="hidden"
                                type="file"
                                accept="image/,.png,.jpg,.jpeg,.webp"
                                multiple
                            />
                            <label className="flex items-center cursor-pointer" htmlFor="files">
                                <ImageIcon className="w-4 h-4 mr-2"/>
                                <span>Upload image</span>
                            </label>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {!!attachments.length && (
                    <div className="p-1 flex space-x-2 w-full overflow-x-auto h-fit rounded-lg bg-white mt-2 border">
                        {attachments.map(({preview: src}, index) => (
                            <Image
                                className="h-[48px] w-auto p-1 rounded-lg border object-cover object-center cursor-pointer hover:border-destructive transition-all"
                                onClick={() => setAttachments(attachments => {
                                    return attachments.filter(({preview}) => preview !== src)
                                })}
                                key={index}
                                src={src}
                                alt="Review Attachments"
                                width={128}
                                height={128}
                            />
                        ))}
                    </div>
                )}

                {errors.text && <p className="text-xs text-destructive">{errors.text}</p>}
            </section>

            <div className="w-full flex justify-between px-4 mt-2 cursor-pointer"
                 aria-disabled={isLoading || !hasAccess}>
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
                <div className="mt-2">
                    <Button type="submit" className="w-full" disabled={isLoading || !hasAccess}>
                        {isLoading ?
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :
                            <Send className="font-normal w-4 h-4 ml-1"/>
                        } Send
                    </Button>
                </div>
            </HoverInfoCard>
        </form>
    );
};