import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./bookThunk";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                (state.loading = true), (state.error = null);
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                (state.loading = false), (state.items = action.payload);
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default booksSlice.reducer;
