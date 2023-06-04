import type {FC} from 'react';
import type {User} from "@/types/user.interface";
import {Card} from "@common/Card";
import {Avatar, AvatarFallback, AvatarImage} from "@common/Avatar";
import {Skeleton} from "@ui/Skeleton";
import {UserActionButtons} from "@containers/user/layout/ActionButtons";
import {useProfile} from "@hooks/useProfile";
import {Button} from "@ui/Button";

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
            {
                user.id === profile?.id ? (
                    <Button className="w-full" disabled>Edit profile</Button>
                ): (
                    <UserActionButtons className="w-full" />
                )
            }
        </Card>
    );
};