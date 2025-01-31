import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchOrder = createAsyncThunk(
    "orders/fetchOrder",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendUrl}/orders/${userId}`, {
                withCredentials: true,
            });
            return response.data.orders;
        } catch (error) {
            console.error(
                "Error fetching order:",
                error.response?.data || error.message
            );
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${backendUrl}/orders/placeOrder`,
                orderData,
                { withCredentials: true }
            );
            return response.data.newOrder;
        } catch (error) {
            console.error(
                "Error placing order:",
                error.response?.data || error.message
            );
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
