import type {FC} from "react";
import type {AvatarImageProps} from "@radix-ui/react-avatar";
import {Skeleton} from "@ui/Skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@common/Avatar";

interface UserAvatarProps extends AvatarImageProps {}

export const UserAvatar: FC<UserAvatarProps> = ({...props}) => {
    return (
        <Avatar>
            <AvatarImage {...props}/>
            <AvatarFallback>
                <Skeleton />
            </AvatarFallback>
        </Avatar>
    )
}