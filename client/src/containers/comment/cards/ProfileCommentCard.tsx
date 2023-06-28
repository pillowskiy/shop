import {memo} from "react";
import type {Comment} from "@/types/comment.interface";
import {CommentUserHeader} from "@containers/comment/layout/CommentUserHeader";
import {StarRating} from "@containers/product/layout/StarRating";
import {CommentDeleteButton} from "@containers/comment/layout/CommentDeleteButton";

interface ProfileCommentCardProps {
    comment: Comment;
    userId: number;
}

const ProfileCommentCard = memo<ProfileCommentCardProps>(({comment, userId}) => {
    return (
        <article className="w-full relative h-fit border p-2 rounded-md mb-4 bg-white animate-catalog-mount">
            <CommentUserHeader user={comment.author} subtitle={comment.author.roles.at(-1)?.toString()}/>
            <p className="text-primary opacity-90 text-xs absolute right-0 mr-4 top-0 mt-5">
                {new Date(comment.createdAt).toLocaleDateString()}
            </p>

            <hr className="my-2 w-full"/>

            <section>
                {comment.rating && <StarRating className="mb-2" rating={comment.rating} text=" "/>}
                <span>{comment.text}</span>
            </section>

            <footer className="mt-2 pt-2 border-t flex space-x-2">
                <CommentDeleteButton
                    comment={comment}
                    userId={userId}
                    className="h-6 ml-auto px-1 sm:pl-2 sm:pr-3 opacity-80 md:hover:opacity-100 transition-all"
                    variant="destructive"
                >
                    🗑️ <p className="hidden sm:block ml-1"> Delete</p>
                </CommentDeleteButton>
            </footer>
        </article>
    );
});

ProfileCommentCard.displayName = "ProfileCommentCard";
export {ProfileCommentCard};