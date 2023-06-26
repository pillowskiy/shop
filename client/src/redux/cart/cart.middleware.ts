import type {RootState} from "@redux/store";
import type {Middleware, AnyAction} from 'redux';
import {setLocalStorage} from "@lib/utils";

export const cartMiddleware: Middleware<{}, RootState> = store => next => (action: AnyAction) => {
    const result = next(action);
    const state = store.getState();

    setLocalStorage('cart', JSON.stringify(state.cart.items));

    return result;
};