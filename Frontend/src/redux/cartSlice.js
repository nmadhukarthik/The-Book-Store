import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCart,
    addToCart,
    decrementQuantity,
    removeFromCart,
    clearCart,
} from "./cartThunk";

const cartSlice = createSlice({
    name: "cart",
    initialState: { userCarts: {} },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                if (!state.userCarts) state.userCarts = {};
                state.userCarts[action.payload.userId] = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (!state.userCarts) state.userCarts = {};
                if (state.userCarts[action.payload.userId]) {
                    state.userCarts[action.payload.userId].items =
                        action.payload.items;
                    state.userCarts[action.payload.userId].totalQuantity =
                        action.payload.totalQuantity;
                } else {
                    state.userCarts[action.payload.userId] = action.payload;
                }
            })

            .addCase(decrementQuantity.fulfilled, (state, action) => {
                if (!state.userCarts) state.userCarts = {};
                if (state.userCarts[action.payload.userId]) {
                    state.userCarts[action.payload.userId].items =
                        action.payload.items;
                    state.userCarts[action.payload.userId].totalQuantity =
                        action.payload.totalQuantity;
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                if (!state.userCarts) state.userCarts = {};
                if (state.userCarts[action.payload.userId]) {
                    state.userCarts[action.payload.userId].items =
                        action.payload.items;
                    state.userCarts[action.payload.userId].totalQuantity =
                        action.payload.totalQuantity;
                }
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                if (!state.userCarts) state.userCarts = {};
                state.userCarts[action.payload.userId] = {
                    items: {},
                    totalQuantity: 0,
                };
            });
    },
});

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import {
//     fetchCart,
//     addToCart,
//     decrementQuantity,
//     removeFromCart,
//     clearCart,
// } from "./cartThunk";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: { userCarts: {} },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.userCarts[action.meta.arg] = action.payload;
//             })
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 state.userCarts[action.meta.arg.userId] = action.payload;
//             })
//             .addCase(decrementQuantity.fulfilled, (state, action) => {
//                 state.userCarts[action.meta.arg.userId] = action.payload;
//             })
//             .addCase(removeFromCart.fulfilled, (state, action) => {
//                 state.userCarts[action.meta.arg.userId] = action.payload;
//             })
//             .addCase(clearCart.fulfilled, (state, action) => {
//                 delete state.userCarts[action.meta.arg];
//             });
//     },
// });

// export default cartSlice.reducer;

//use the below code for only frontend react app o backend involved..instant changes on ui
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     userCarts: {}, // Store user-specific carts
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const { userId, productId } = action.payload;
//             if (!state.userCarts[userId]) {
//                 state.userCarts[userId] = { items: {}, totalQuantity: 0 };
//             }
//             const userCart = state.userCarts[userId];
//             if (userCart.items[productId]) {
//                 userCart.items[productId] += 1;
//             } else {
//                 userCart.items[productId] = 1;
//             }
//             userCart.totalQuantity += 1;
//         },

//         removeFromCart: (state, action) => {
//             const { userId, productId } = action.payload;
//             const userCart = state.userCarts[userId];
//             if (userCart?.items[productId]) {
//                 userCart.totalQuantity -= userCart.items[productId];
//                 delete userCart.items[productId];
//             }
//         },

//         decrementQuantity: (state, action) => {
//             const { userId, productId } = action.payload;
//             const userCart = state.userCarts[userId];
//             if (userCart?.items[productId]) {
//                 if (userCart.items[productId] > 1) {
//                     userCart.items[productId] -= 1;
//                     userCart.totalQuantity -= 1;
//                 } else {
//                     delete userCart.items[productId];
//                     userCart.totalQuantity -= 1;
//                 }
//             }
//         },

//         clearCart: (state, action) => {
//             const { userId } = action.payload;
//             if (state.userCarts[userId]) {
//                 state.userCarts[userId] = { items: {}, totalQuantity: 0 };
//             }
//         },
//     },
// });

// export const { addToCart, removeFromCart, decrementQuantity, clearCart } =
//     cartSlice.actions;
// export const selectUserCart = (state, userId) => state.cart.userCarts[userId] || { items: {}, totalQuantity: 0 };
// export default cartSlice.reducer;

// use the below code for sigle user ie, single cart
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     items: {}, // Store cart items in an object where key = product ID and value = quantity
//     totalQuantity: 0,
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const productId = action.payload;
//             if (state.items[productId]) {
//                 state.items[productId] += 1;
//             } else {
//                 state.items[productId] = 1;
//             }
//             state.totalQuantity += 1;
//         },

//         removeFromCart: (state, action) => {
//             const productId = action.payload;
//             if (state.items[productId]) {
//                 state.totalQuantity -= state.items[productId];
//                 delete state.items[productId];
//             }
//         },

//         decrementQuantity: (state, action) => {
//             const productId = action.payload;
//             if (state.items[productId] > 1) {
//                 state.items[productId] -= 1;
//                 state.totalQuantity -= 1;
//             } else {
//                 delete state.items[productId];
//                 state.totalQuantity -= 1;
//             }
//         },

//         clearCart: (state) => {
//             state.items = {};
//             state.totalQuantity = 0;
//         },
//     },
// });

// export const { addToCart, removeFromCart, decrementQuantity, clearCart } =
//     cartSlice.actions;
// export default cartSlice.reducer;
