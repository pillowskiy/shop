import type {FC, PropsWithChildren} from 'react';
import type {User} from "@/types/user.interface";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@common/HoverCard";
import {UserAvatar} from "@components/UserAvatar";
import {CalendarDays} from "lucide-react";

interface ProfileHoverCardProps {
    user: User | undefined;
}

export const ProfileHoverCard: FC<PropsWithChildren<ProfileHoverCardProps>> = ({children, user}) => {
    // TEMP
    if (!user) {
        return <>{children}</>;
    }

    return (
        <HoverCard closeDelay={200} openDelay={0}>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <UserAvatar src={user.avatarURL} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user.name}</h4>
                        <p className="text-sm">
                            There will be some content here, but I have not figured out what it is yet. :D
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {new Date().toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};