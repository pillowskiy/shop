import {setLocalStorage} from "@lib/utils";

export const cartMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();

    setLocalStorage('cart', JSON.stringify(state.cart.items));

    return result;
};