import {useEffect, useState} from "react";
import {useAppDispatch} from "@redux/store";
import {checkAuth} from "@redux/user/user.actions";
import TokenService from "@api/services/token.service";
import {useAuth} from "@hooks/useAuth";

export const useAuthChecker = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dispatchAuth = async () => {
            await dispatch(checkAuth());
            setTimeout(() => setIsLoaded(true), 200);
        }

        TokenService.getToken() && !user ? dispatchAuth() : setTimeout(() => setIsLoaded(true), 200);
    }, [dispatch]);

    return {isLoaded, user};
}