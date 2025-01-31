import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backendUrl}/book`);
            return data;
        } catch (error) {
            return rejectWithValue(
                "Failed to load books. Please try again later."
            );
        }
    }
);
