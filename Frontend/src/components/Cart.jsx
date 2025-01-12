import React, { useEffect, useMemo } from "react";
import Checkout from "./Checkout";
import { useAuth } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../redux/cartThunk";

const Cart = () => {
    const [authUser, setAuthUser] = useAuth();
    const userId = authUser._id;
    const cartItem = useSelector(
        (state) => state.cart.userCarts[userId]?.totalQuantity || []
    );
    console.log(userId);
    if (!userId) {
        return <div>Please log in to view your cart.</div>;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Fetching Cart for User");
        if (userId) {
            dispatch(fetchCart(userId));
            console.log(cartItem);
        }
    }, [userId, dispatch]);

    const {
        items: books,
        loading,
        error,
    } = useSelector((state) => state.books);

    const userCarts = useSelector((state) => state.cart.userCarts || {});
    console.log("User Carts:", userCarts); // Debugging step

    const cartItems = userCarts[userId]?.items || [];
    console.log("Cart Items:", cartItems); // Debugging step

    // console.log(cartItems);

    const totalCartAmount = useMemo(() => {
        return cartItems?.reduce((total, cartItem) => {
            const item = books.find(
                (book) => book._id === cartItem.productId._id
            );
            return item ? total + item.price * cartItem.quantity : total;
        }, 0);
    }, [books, cartItems]);

    const deliveryFee = totalCartAmount === 0 ? 0 : 2;

    {
        if (loading) {
            return <div>Loading....</div>;
        }

        if (error || cartItems.length === 0) {
            return (
                <div className="mt-40 bg-orange-300 w-96 h-24 p-8 rounded-md text-center m-auto text-xl">
                    {error
                        ? "Failed to load cart. Please try again."
                        : "The Cart is empty"}
                </div>
            );
        }

        // console.log("Books Array:", books);
        // console.log("Cart Items:", cartItems);

        const filteredBooks = cartItems
            .map((cartItem) => {
                const matchedBook = books?.find(
                    (book) => book._id === cartItem.productId._id
                );
                console.log("Matching:", cartItem.productId, "→", matchedBook);
                // console.log(matchedBook);
                return matchedBook;
            })
            .filter(Boolean); // Remove any `undefined` values

        return (
            <div className="mt-16 max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="grid grid-cols-5 items-center m-5 p-5 mb-0 w-full text-gray-600">
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />

                {filteredBooks.length > 0 ? (
                    filteredBooks.map((item) => {
                        const cartItem = cartItems.find(
                            (ci) => ci.productId._id === item._id
                        );
                        // console.log(cartItem);
                        return (
                            <div
                                key={item._id}
                                className="m-5 p-5 grid grid-cols-5 items-center w-full"
                            >
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-w-15 max-h-20"
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <p className="p-3">${item.price}</p>
                                <p>{cartItem?.quantity || 0}</p>
                                <p>${item.price * (cartItem?.quantity || 0)}</p>
                                <p
                                    className="cursor-pointer"
                                    onClick={() =>
                                        dispatch(
                                            removeFromCart({
                                                userId,
                                                productId: item._id,
                                            })
                                        )
                                    }
                                >
                                    X
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <div className="m-auto text-center">
                        Add items to the cart
                    </div>
                )}
                <hr />

                <div className="w-80 m-auto">
                    <h1 className="p-5 text-xl font-bold">Cart Total</h1>
                    <div className="flex justify-between p-5">
                        <p>Subtotal</p>
                        <p>${totalCartAmount}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between p-5">
                        <p>Delivery Fee</p>
                        <p>${deliveryFee}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between p-5">
                        <p>Total</p>
                        <p>${totalCartAmount + deliveryFee}</p>
                    </div>
                </div>

                <div className="mx-auto w-20 h-10 md:px-20 md:ml-[400px] px-4">
                    <Checkout subTotal={totalCartAmount + deliveryFee} />
                </div>
            </div>
        );
    }
};

export default Cart;
