import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {Card} from "@common/Card";
import {Avatar, AvatarFallback, AvatarImage} from "@common/Avatar";
import {Skeleton} from "@ui/Skeleton";
import {UserActionButtons} from "@containers/user/layout/ActionButtons";
import {useProfile} from "@hooks/useProfile";
import {Button} from "@ui/Button";
import {EditProfileDialog} from "@containers/user/layout/EditProfileDialog";
import {cn} from "@lib/utils";

interface UserActionCardProps {
    user: User;
}

export const UserActionCard: FC<UserActionCardProps> = ({user}) => {
    const {profile} = useProfile();

    return (
        <Card className="h-fit p-4 flex flex-col items-center gap-4 bg-popover">
            <Avatar className="w-full h-auto max-w-[220px] rounded-lg border">
                <AvatarImage className="object-cover object-top" src={user.avatarURL} width={360} height={360}/>
                <AvatarFallback>
                    <Skeleton />
                </AvatarFallback>
            </Avatar>

            <div className={cn(
                "w-full px-1 py-2 h-10 bg-white border shadow-sm rounded-lg",
                "uppercase font-bold text-center select-none"
            )}>
                <p className="drop-shadow-lg text-primary shadow-muted-200">{user.roles.at(-1)}</p>
            </div>

            {
                user.id === profile?.id ? (
                    <EditProfileDialog>
                        <Button className="w-full">Edit profile</Button>
                    </EditProfileDialog>
                ): (
                    <UserActionButtons className="w-full" />
                )
            }
        </Card>
    );
};