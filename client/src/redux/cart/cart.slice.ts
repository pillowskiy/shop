import type {CartInitialState} from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// TEMP: use only the product ID
const initialState: CartInitialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.items.push(newItem);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload.id;
            state.items = state.items.filter(id => id !== itemId);
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;