import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import booksReducer from "./bookSlice";
import cartReducer from "./cartSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["books"], // Exclude books from persistence
};

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["cart"], // Persist only the cart state
// };

const rootReducer = combineReducers({
    cart: cartReducer,
    books: booksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable checks for non-serializable data (e.g., persist state)
        }), // Include thunk explicitly for async handling
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export const persistor = persistStore(store);

export default store;
