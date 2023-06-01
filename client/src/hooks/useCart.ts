import {useSelector} from "@hooks/useSelector";

export const useCart = () => {
    const {items} = useSelector(state => state.cart);
    const totalCost = items.reduce((acc, {price, quantity}) => price * quantity + acc, 0);

    return { items, totalCost };
}