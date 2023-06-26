import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";
import TokenService from "@api/services/token.service";

export const useFavorites = () => {
    const query = useQuery(['get favorites'], () => {
        return ProductService.getUserFavorites();
    }, {
        select: ({data}) => data,
        enabled: !!TokenService.getToken()
    });
    return query;
};