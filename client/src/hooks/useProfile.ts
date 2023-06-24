import {useQuery} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import TokenService from "@api/services/token.service";

export const useProfile = () => {
    const { data, ...items } = useQuery(['get profile'], () => {
        return UserService.getProfile();
    }, {
        select: ({data}) => data,
        refetchOnWindowFocus: true,
        enabled: !!TokenService.getToken()
    });
    return { profile: data, ...items };
}