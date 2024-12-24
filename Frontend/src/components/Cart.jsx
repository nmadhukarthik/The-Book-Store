import React, { useEffect, useMemo } from "react";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/booksSlice";
import { useAuth } from "../context/AuthProvider";
// import axios from 'axios'

const Cart = () => {
    const dispatch = useDispatch();
    const {
        items: books,
        loading,
        error,
    } = useSelector((state) => state.books);
    // const [books, setBooks] = useState([])
    // const [loading, setLoading] = useState(true)
    const [, , , removeFromCart, cartItems, setCartItems] = useAuth();

    // const getBookList = async () => {

    //     try {
    //         const res = await axios.get("https://book-store-8vla.onrender.com/book")
    //         console.log(res)
    //         setBooks(res.data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        dispatch(fetchBooks());
        // getBookList()
    }, []);

    const getTotalCartAmount = useMemo(() => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const item = books.find((book) => book._id === itemId);
            return item ? total + item.price * quantity : total;
        }, 0);
    }, [books, cartItems]);

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0
    //     console.log(cartItems)
    //     // console.log(typeof(cartItems))
    //     for (const item in cartItems) {
    //         console.log(books)
    //         if (cartItems[item] > 0) {
    //             // console.log("inside if")
    //             let itemInfo = books.find((product) => product._id === item)
    //             console.log(itemInfo)
    //             totalAmount += itemInfo.price * cartItems[item]
    //         }
    //     }
    //     return totalAmount
    // }

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
                            if (cartItems[item._id] > 0) {
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
                                            <p>{cartItems[item._id]}</p>
                                            <p>
                                                $
                                                {item.price *
                                                    cartItems[item._id]}
                                            </p>
                                            <p
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    removeFromCart(item._id);
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
