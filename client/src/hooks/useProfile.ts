import {useQuery} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import TokenService from "@api/services/token.service";

export const useProfile = () => {
    const { data } = useQuery(['get profile'], () => {
        return UserService.getProfile();
    }, {
        select: ({data}) => data,
        enabled: !!TokenService.getToken()
    });
    return { profile: data };
}