import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user's cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    const response = await axios.get(`/cart/${userId}`);
    return response.data;
});

// Add item to user's cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId }) => {
        const response = await axios.post("/cart/add", {
            userId,
            productId,
        });
        return response.data;
    }
);

// Decrement quatity
export const decrementQuantity = createAsyncThunk(
    "cart/decrementQuantity",
    async ({ userId, productId }) => {
        const response = await axios.post("/cart/decrement", {
            userId,
            productId,
        });
        return response.data;
    }
);

// Remove item from user's cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, productId }) => {
        const response = await axios.post("/cart/remove", {
            userId,
            productId,
        });
        return response.data;
    }
);

// Clear user's cart
export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
    await axios.post("/cart/clear", { userId });
    return { userId };
});
