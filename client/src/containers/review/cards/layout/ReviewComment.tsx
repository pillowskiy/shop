import type {Review} from "@/types/review.interface";
import {memo} from "react";
import {Toggle} from "@ui/Toggle";
import {Button} from "@ui/Button";
import {UserAvatar} from "@components/UserAvatar";
import {ProductReportDialog} from "../../dialogs/ProductReportDialog";
import {StarRating} from "@containers/product/layout/StarRating";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useProfile} from "@hooks/useProfile";
import {cn} from "@lib/utils";
import {ProfileHoverCard} from "@containers/user/cards/popover/ProfileHoverCard";
import {ReviewDeleteButton} from "@containers/review/layout/ReviewDeleteButton";
import Image from "next/image";

interface ReviewCommentProps {
    hasAccess: boolean;
    review: Review;
    productId: number;
}

const ReviewComment = memo<ReviewCommentProps>(({review, productId, hasAccess}) => {
    const queryClient = useQueryClient();
    const {profile} = useProfile();
    const helpfulCount = review.helpful.length;
    const isHelpful = review.helpful.some(({id}) => profile?.id === id);
    const {mutate, isLoading} = useMutation(['toggle helpful', review.id], () => {
        return UserService.toggleHelpful(review.id);
    }, {
        onSuccess: () => queryClient.invalidateQueries(['get reviews', productId])
    });

    return (
        <div className="w-full relative h-fit border p-2 rounded-md mb-4 bg-white">
            <ProfileHoverCard user={review.user}>
                <div className="flex items-center gap-2 w-fit">
                    {/*TEMP src*/}
                    <UserAvatar
                        className="rounded-full h-8 w-8 m-auto"
                        src={review.user?.avatarURL || "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"}
                        alt={review.user?.name || "Customer Avatar"}
                    />
                    <div>
                        <h2 className={cn(
                            "font-medium text-lg leading-5 transition-all", {
                                "md:hover:underline cursor-pointer": !!review.user
                            }
                        )}>
                            {review.user?.name || "Customer"}
                        </h2>
                        <p className="text-primary opacity-90 text-xs leading-3">Customer feedback</p>
                    </div>
                </div>
            </ProfileHoverCard>
            <p className="text-primary opacity-90 text-xs absolute right-0 mr-4 top-0 mt-5">
                {new Date(review.createdAt).toLocaleDateString()}
            </p>

            <hr className="my-2 w-full"/>

            <div>
                <StarRating className="mb-2" rating={review.rating} text=" "/>
                <span>{review.text}</span>
            </div>

            {!!review.attachments?.length && (
                <div className="pt-2 border-t h-fit w-full overflow-x-auto mt-2">
                    {review.attachments.map((src, index) => (
                        <Image
                            key={index}
                            className="h-[48px] w-auto p-1 border bg-white rounded-lg cursor-pointer"
                            src={src}
                            alt="Review Attachment"
                            width={128}
                            height={128}
                        />
                    ))}
                </div>
            )}

            <footer className="mt-2 pt-2 border-t flex space-x-2">
                <Toggle
                    pressed={isHelpful}
                    className="h-6"
                    variant="outline"
                    disabled={!hasAccess || isLoading}
                    onClick={mutate}
                >
                    👍 {helpfulCount}
                </Toggle>
                <ProductReportDialog>
                    <Button className="h-6 pl-2" variant="secondary" disabled={!hasAccess}>⚡ Report </Button>
                </ProductReportDialog>
                <ReviewDeleteButton
                    review={review}
                    productId={productId}
                    className="h-6 ml-auto px-1 sm:pl-2 sm:pr-3 opacity-80 md:hover:opacity-100 transition-all absolute right-2"
                    variant="destructive"
                >
                    🗑️ <p className="hidden sm:block ml-1"> Delete</p>
                </ReviewDeleteButton>
            </footer>
        </div>
    );
});

ReviewComment.displayName = "ReviewComment";
export { ReviewComment };