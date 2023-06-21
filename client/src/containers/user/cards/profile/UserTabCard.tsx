import type {FC} from 'react';
import {Card} from "@common/Card";
import {useQuery} from "@tanstack/react-query";
import CommentService from "@api/services/comment.service";
import {ProfileCommentCard} from "@containers/comment/cards/ProfileCommentCard";

interface UserTabCardProps {
    userId: number;
}

export const UserTabCard: FC<UserTabCardProps> = ({userId}) => {
    const {data} = useQuery(['get comments', userId], () => {
        return CommentService.getById(userId);
    }, {
        select: ({data}) => data,
    })

    if (!data?.comments.length) {
        return (
            <Card className="p-4 bg-popover text-center mt-4">
                <h2 className="text-xl sm:text-2xl font-medium py-4 select-none">
                    🙅 There are not items yet.
                </h2>
            </Card>
        )
    }

    return (
        <Card className="p-4 bg-popover mt-4">
            {data.comments.map(comment => (
                <ProfileCommentCard key={comment.id} comment={comment} userId={userId} />
            ))}
        </Card>
    )
};