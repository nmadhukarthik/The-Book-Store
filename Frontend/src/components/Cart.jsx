import React, { useEffect, useMemo } from "react";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/thunk";
import { removeFromCart } from "../redux/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const {
        items: books,
        loading,
        error,
    } = useSelector((state) => state.books);
    const { items: cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    const getTotalCartAmount = useMemo(() => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const item = books.find((book) => book._id === itemId);
            return item ? total + item.price * quantity : total;
        }, 0);
    }, [books, cartItems]);

    {
        if (loading) {
            return <div>Loading....</div>;
        } else if (error || Object.keys(cartItems).length === 0) {
            return (
                <div className="mt-40 bg-orange-300 w-96 h-24 p-8 rounded-md text-center m-auto text-xl">
                    {error
                        ? "Failed to load cart. Please try again."
                        : "The Cart is empty"}
                </div>
            );
        } else {
            return (
                <div className="mt-16  max-w-screen-2xl container mx-auto md:px-20 px-4">
                    <div className="grid grid-cols-5 items-center m-5 p-5 mb-0 w-full text-gray-600 max-w-screen-2xl container mx-auto md:px-20 px-4">
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quatity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />

                    {books &&
                        books.map((item) => {
                            const quantity = cartItems[item._id];
                            if (quantity > 0) {
                                return (
                                    <>
                                        <div className=" m-5 p-5  grid grid-cols-5 items-center w-full ">
                                            <div>
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="max-w-15 max-h-20"
                                                />
                                                <p>{item.name}</p>
                                            </div>
                                            <p className="p-3">
                                                $ {item.price}
                                            </p>
                                            {/* <p>{cartItems[item._id]}</p> */}
                                            <p>{quantity}</p>
                                            <p>${item.price * quantity}</p>
                                            <p
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    dispatch(
                                                        removeFromCart(item._id)
                                                    );
                                                }}
                                            >
                                                {" "}
                                                X{" "}
                                            </p>
                                        </div>
                                        <hr className="m-3" />
                                    </>
                                );
                            } else {
                                <div className="m-auto">
                                    {" "}
                                    Add items to cart
                                </div>;
                            }
                        })}
                    <br />
                    <br />
                    <div className="w-80 m-auto ">
                        <h1 className="p-5 text-xl font-bold">Cart Total</h1>

                        <div className="flex justify-between p-5">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-5">
                            <p>delivery Fee</p>
                            <p>${getTotalCartAmount === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-5">
                            <p>Total</p>
                            <p>
                                $
                                {getTotalCartAmount === 0
                                    ? 0
                                    : getTotalCartAmount + 2}
                            </p>
                        </div>
                    </div>

                    <div className=" mx-auto w-20 h-10  md:px-20 md:ml-[400px] px-4">
                        <Checkout subTotal={getTotalCartAmount + 2} />
                    </div>
                </div>
            );
        }
    }
};

export default Cart;
