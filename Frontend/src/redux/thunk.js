import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://localhost:4001/book");
            return data;
        } catch (error) {
            return rejectWithValue(
                "Failed to load books. Please try again later."
            );
        }
    }
);
