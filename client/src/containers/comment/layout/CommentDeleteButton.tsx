import type {FC, PropsWithChildren} from 'react';
import type {Comment} from "@/types/comment.interface";
import {Role} from "@/types/user.interface";
import {useProfile} from "@hooks/useProfile";
import {Button, ButtonProps} from "@ui/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CommentService from "@api/services/comment.service";
import {buildToast, useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {Trash2} from "lucide-react";
import {cn} from "@lib/utils";

interface ReviewDeleteButtonProps extends ButtonProps {
    comment: Comment;
    userId: number;
}

export const CommentDeleteButton: FC<PropsWithChildren<ReviewDeleteButtonProps>> = ({
    comment,
    className,
    children,
    userId,
    ...props
}) => {
    const {profile} = useProfile();
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const canDelete =
        profile?.roles.some(role => role === Role.Admin) ||
        comment.author.id === profile?.id ||
        profile?.id === userId;

    const {mutate} = useMutation(['delete comment', comment.id], () => {
        return CommentService.delete(comment.id);
    }, {
        onSuccess: () => {
            toast(buildToast("comment.delete.success").toast);
            return queryClient.invalidateQueries(['get comments', userId])
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