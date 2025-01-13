import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
// console.log(backendUrl);
// Fetch user's cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    const response = await axios.get(`${backendUrl}/cart/${userId}`);
    console.log("Cart Data:", response.data);
    return response.data;
});

// Add item to user's cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId }) => {
        const response = await axios.post(`${backendUrl}/cart/add`, {
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
        const response = await axios.post(`${backendUrl}/cart/decrement`, {
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
        const response = await axios.post(`${backendUrl}/cart/remove`, {
            userId,
            productId,
        });
        return response.data;
    }
);

// Clear user's cart
export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
    // console.log("Clearing cart for user:", userId);
    await axios.post(`${backendUrl}/cart/clear`, { userId });
    return userId;
});
