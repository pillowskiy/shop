import type {FC, PropsWithChildren} from 'react';
import type {Review} from "@/types/review.interface";
import {Role} from "@/types/user.interface";

import {Trash2} from "lucide-react";
import {Button, ButtonProps} from "@ui/Button";

import {useProfile} from "@hooks/useProfile";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReviewService from "@api/services/review.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";

import {cn} from "@lib/utils";

interface ReviewDeleteButtonProps extends ButtonProps {
    review: Review;
    productId: number;
}

export const ReviewDeleteButton: FC<PropsWithChildren<ReviewDeleteButtonProps>> = ({
    review,
    className,
    children,
    productId,
    ...props
}) => {
    const {profile} = useProfile();
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const canDelete = profile?.roles.some(role => role === Role.Admin) || review.user?.id === profile?.id;

    const {mutate} = useMutation(['delete review', review.id], () => {
        return ReviewService.delete(review.id);
    }, {
        onSuccess: () => {
            toast(buildToast("review.delete.success").toast);
            return queryClient.invalidateQueries(['get reviews', productId])
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            toast(buildToast("error", {
                error: err.response?.data?.message || "Unhandled error occurred!"
            }).toast);
        }
    })

    if (!profile || !canDelete) return null;

    return (
        <Button className={cn("h-fit w-fit", className)} variant="secondary" onClick={() => mutate()} {...props}>
            {children ? children : <Trash2 className="w-4 h-4"/>}
        </Button>
    );
};