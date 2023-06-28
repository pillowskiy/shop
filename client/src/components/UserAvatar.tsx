"use client";
import type {FC} from "react";
import type {AvatarImageProps} from "@radix-ui/react-avatar";
import {Skeleton} from "@ui/Skeleton";
import {cn} from "@lib/utils";

import {Avatar, AvatarFallback, AvatarImage} from "@common/Avatar";

interface UserAvatarProps extends AvatarImageProps {}

export const UserAvatar: FC<UserAvatarProps> = ({className, ...props}) => {
    return (
        <Avatar className={className}>
            <AvatarImage className={cn("object-cover object-top", className)} {...props}/>
            <AvatarFallback>
                <Skeleton />
            </AvatarFallback>
        </Avatar>
    )
}