import type {CartFullestItem, CartInitialState, CartItem} from "@/types/cart.interface";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {getFromLocalStorage} from "@lib/utils";
import {Product} from "@types/product.interface";

const initialState: CartInitialState = {
    items: JSON.parse(getFromLocalStorage('cart') || "[]"),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartInitialState, action: PayloadAction<CartFullestItem>) => {
            const newItem = action.payload;
            const isItemExist = current(state.items).findIndex(item => item.productId === newItem.productId);
            if (isItemExist >= 0) return;
            state.items.push({productId: newItem.productId, count: newItem.count || 1});
        },
        removeFromCart: (state: CartInitialState, action: PayloadAction<Product>) => {
            const itemId = action.payload.id;
            state.items = current(state.items).filter(item => item.productId !== itemId);
        },
        updateCartItem: (state: CartInitialState, action: PayloadAction<CartItem>) => {
            const itemId = action.payload.productId;
            const index = current(state.items).findIndex(item => item.productId === itemId);
            if (index >= 0) {
                state.items[index] = action.payload;
            }
        },
        clearCart: (state: CartInitialState) => {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;