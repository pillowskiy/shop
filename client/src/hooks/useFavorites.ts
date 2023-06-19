import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import TokenService from "@api/services/token.service";
import {useState} from "react";

export const useFavorites = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {data} = useQuery(['get favorites'], () => {
        return ProductService.getUserFavorites();
    }, {
        select: ({data}) => data,
        onSettled: () => setTimeout(() => setIsLoaded(true), 600),
        enabled: !!TokenService.getToken()
    });
    return {data, isLoaded};
};