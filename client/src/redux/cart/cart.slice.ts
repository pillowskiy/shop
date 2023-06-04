import type {CartInitialState} from "@/types";
import {createSlice, current} from "@reduxjs/toolkit";
import {getFromLocalStorage} from "@lib/utils";

// TEMP: use only the product ID
const initialState: CartInitialState = {
    items: JSON.parse(getFromLocalStorage('cart') || "[]"),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.items.push({...newItem, count: newItem.count || 1});
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload.id;
            state.items = current(state.items).filter(item => item.id !== itemId);
        },
        updateCart: (state, action) => {
            const itemId = action.payload.id;
            const index = current(state.items).findIndex(item => item.id === itemId);
            if (index >= 0) {
                state.items[index] = action.payload;
            }
        }
    },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;