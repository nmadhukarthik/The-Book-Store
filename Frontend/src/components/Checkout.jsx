import axios from "axios";
import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { clearCart, fetchCart } from "../redux/cartThunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Checkout = ({ subTotal }) => {
    const [authUser, setAuthUser] = useAuth();
    const userId = authUser?._id;
    // console.log("User ID:", userId);
    const dispatch = useDispatch();
    async function tokenHandler(token) {
        // console.log("Received Token:", token);
        try {
            const response = await axios.post(`${backendUrl}/payment/pay`, {
                token,
                amount: subTotal * 100,
            });
            console.log("Payment Success:", response.data);
            toast.success("Payment Successful!");
            if (response.data.success) {
                dispatch(clearCart(userId));
                dispatch(fetchCart(userId));
                // console.log("Cart cleared!");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Failed! Please try again.");
        }
    }

    return (
        <div>
            <StripeCheckout
                amount={subTotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_51QATveP70aoJEPJCZm5P6CEgFMlJguS4FxKQ4rQUue5lyS8PgcWNUn8ypWOIVmtSX2GJwG5ow4flYl3h8MdApO5500WGBURIAw"
                currency="SGD"
            >
                <button className="btn bg-orange-500 w-[230px] cursor-pointer px-2  rounded-full border-[2px] hover:bg-orange-400 hover:text-white duration-200  dark:text-white max-w-screen-2xl container mx-auto md:px-20 ">
                    Pay Now
                </button>
            </StripeCheckout>
        </div>
    );
};

export default Checkout;
