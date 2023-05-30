import type {FC} from 'react';
import type {Review} from "@/types/review.interface";
import {Toggle} from "@ui/Toggle";
import {Button} from "@ui/Button";
import {UserAvatar} from "@components/UserAvatar";
import {ProductReportDialog} from "../../dialogs/ProductReportDialog";
import {StarRating} from "@containers/product/layout/StarRating";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useProfile} from "@hooks/useProfile";

interface ReviewCommentProps {
    hasAccess: boolean;
    review: Review;
    productId: number;
}

export const ReviewComment: FC<ReviewCommentProps> = ({review, productId, hasAccess}) => {
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
        <div className="w-full h-fit border p-2 rounded-md mb-4 bg-white">
            <div className="flex items-center gap-2">
                {/*TEMP src*/}
                <UserAvatar
                    className="rounded-full h-8 w-8 m-auto"
                    src={review.user?.avatarURL || "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"}
                    alt={review.user?.name || "Customer Avatar"}
                />
                <div>
                    <h2 className="font-medium text-lg leading-5">{review.user?.name || "Customer"}</h2>
                    <p className="text-primary opacity-90 text-xs leading-3">Customer feedback</p>
                </div>

                <p className="text-primary opacity-90 text-xs ml-auto">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>

            <hr className="my-2 w-full" />

            <div>
                <StarRating className="mb-2" rating={review.rating} text=" "/>
                <span>{review.text}</span>
                <div className="mt-2">
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
                        <Button className="h-6 ml-2 pl-2" variant="secondary" disabled={!hasAccess}>⚡ Report </Button>
                    </ProductReportDialog>
                </div>
            </div>
        </div>
    );
};