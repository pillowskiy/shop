import type {CartFullestItem} from "@/types/cart.interface";
import {useSelector} from "@hooks/useSelector";
import {useQuery} from "@tanstack/react-query";
import ProductService from "@api/services/product.service";

export const useCart = () => {
    const {items} = useSelector(state => state.cart);
    const {data} = useQuery(['get cart products', items.map(({productId}) => productId).toString()], () => {
        return ProductService.getAll({ ids: items.map(({productId}) => productId) })
    }, {
        select: ({data}) => data,
        refetchInterval: false,
        keepPreviousData: true,
    });

    const fullestItems: CartFullestItem[] = data?.products.map(product => {
        return {
            productId: product.id,
            product,
            count: items.find(({productId}) => product.id === productId)?.count || 1
        }
    }) || [];

    const totalCost = fullestItems.reduce((acc, current) => {
        return (current.product.finalPrice * current.count) + acc
    }, 0);
    const totalItems = fullestItems.reduce((acc, {count}) => {
        return acc + count;
    }, 0);

    return { items: fullestItems, totalCost, totalItems };
}