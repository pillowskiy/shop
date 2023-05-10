import {useQuery} from "@tanstack/react-query";
import UserService from "@api/services/user.service";

export const useProfile = () => {
    const { data } = useQuery(['get profile'], () => {
        return UserService.getProfile();
    }, { select: ({data}) => data });
    return { profile: data };
}