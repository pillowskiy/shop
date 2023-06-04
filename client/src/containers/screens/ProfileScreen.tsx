import type {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {Meta} from "@containers/Meta";
import {Main} from "@containers/Main";
import {useState} from "react";
import {Loader} from "@containers/Loader";
import {cn} from "@lib/utils";
import {UserActionCard} from "@containers/user/cards/profile/UserActionCard";
import {UserInfoCard} from "@containers/user/cards/profile/UserInfoCard";
import {UserTabsBreadcrumbCard} from "@containers/user/cards/profile/UserTabsBreadcrumbCard";
import {UserCommentCard} from "@containers/user/cards/profile/UserCommentCard";
import {UserTabCard} from "@containers/user/cards/profile/UserTabCard";

interface ProfileScreenProps {
    userId: number;
}

export const ProfileScreen: FC<ProfileScreenProps> = ({userId}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {data: user} = useQuery(['get user', userId], () => {
        return UserService.getById(userId)
    }, {
        select: ({data}) => data,
        onSettled: () => setTimeout(() => setIsLoaded(true), 400),
        enabled: !!userId
    });

    if (!user || !isLoaded) {
        return <Loader/>
    }

    return (
        <Meta title={user?.name || "Loading.."}>
            <Main className="min-h-screen-64 flex justify-center">
                <section className="w-full md:w-full lg:w-[920px] xl:w-[1080px] p-4 sm:flex gap-4">
                    <section className="w-full sm:w-4/12 lg:w-3/12">
                        <UserActionCard user={user}/>
                    </section>
                    <section className="w-full sm:w-8/12 lg:w-9/12 flex-2">
                        <UserInfoCard user={user} />
                        <UserTabsBreadcrumbCard />
                        <UserCommentCard />
                        <UserTabCard />
                    </section>
                </section>
            </Main>
        </Meta>
    );
};