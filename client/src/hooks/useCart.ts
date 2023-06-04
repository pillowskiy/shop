import {useSelector} from "@hooks/useSelector";

export const useCart = () => {
    const {items} = useSelector(state => state.cart);
    const totalCost = items.reduce((acc, {price, count}) => {
        return (price * count) + acc
    }, 0);
    const totalItems = items.reduce((acc, {count}) => {
        return acc + count;
    }, 0);
    return { items, totalCost, totalItems };
}