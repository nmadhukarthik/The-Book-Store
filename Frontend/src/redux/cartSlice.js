import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {}, // Store cart items in an object where key = product ID and value = quantity
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.items[productId] += 1;
            } else {
                state.items[productId] = 1;
            }
            state.totalQuantity += 1;
        },

        removeFromCart: (state, action) => {
            const productId = action.payload;
            if (state.items[productId]) {
                state.totalQuantity -= state.items[productId];
                delete state.items[productId];
            }
        },

        decrementQuantity: (state, action) => {
            const productId = action.payload;
            if (state.items[productId] > 1) {
                state.items[productId] -= 1;
                state.totalQuantity -= 1;
            } else {
                delete state.items[productId];
                state.totalQuantity -= 1;
            }
        },

        clearCart: (state) => {
            state.items = {};
            state.totalQuantity = 0;
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
