import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder, placeOrder } from "./orderThunk";

const orderSlice = createSlice({
    name: "myOrders",
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                (state.loading = false), (state.items = action.payload);
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                (state.loading = false), (state.error = action.error.message);
            })
            // Handle placeOrder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.userOrders.push(action.payload); // Add new order to state
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
