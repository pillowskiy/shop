import type {FC} from "react";
import type {AvatarImageProps} from "@radix-ui/react-avatar";
import {Skeleton} from "@ui/Skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@common/Avatar";
import {cn} from "@lib/utils";

interface UserAvatarProps extends AvatarImageProps {}

export const UserAvatar: FC<UserAvatarProps> = ({className, ...props}) => {
    return (
        <Avatar>
            <AvatarImage className={cn("object-cover object-top", className)} {...props}/>
            <AvatarFallback>
                <Skeleton />
            </AvatarFallback>
        </Avatar>
    )
}