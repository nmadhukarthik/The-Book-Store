import configureStore from "@reduxjs/toolkit";
import booksReducer from "./bookSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        books: booksReducer,
        cart: cartReducer,
    },
});

export default store;
