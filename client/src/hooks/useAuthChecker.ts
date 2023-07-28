import {useEffect, useState} from "react";
import {useAppDispatch} from "@redux/store";
import {checkAuth} from "@redux/user/user.actions";
import TokenService from "@api/services/token.service";
import {useAuth} from "@hooks/useAuth";

export const useAuthChecker = () => {
    const {user, isLoading} = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dispatchAuth = async () => {
            await dispatch(checkAuth());
        }

        (TokenService.getToken() && !user) && dispatchAuth();
    }, [dispatch]);

    return {isLoading, user};
}