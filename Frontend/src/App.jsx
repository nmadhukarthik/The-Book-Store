import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Courses from "./Courses/course";
import Signup from "./components/Signup";
import { useAuth } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cart from "./components/Cart";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./redux/thunk.js";
import Login from "./components/Login.jsx";
import { fetchCart } from "./redux/cartThunk.js";

const App = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [authUser, setAuthUser] = useAuth();
    const userId = authUser ? authUser._id : null;
    const cartItems = useSelector(
        (state) => state.cart.userCarts[userId]?.totalQuantity || null
    );
    console.log(cartItems);
    useEffect(() => {
        dispatch(fetchBooks());
        if (userId) {
            dispatch(fetchCart(userId));
        }
    }, [userId, cartItems, dispatch]);

    const GoogleWrapper = () => {
        return (
            <GoogleOAuthProvider clientId="856582538119-kpep1k9vl4kdmse6qntktfgnaddusgbq.apps.googleusercontent.com">
                <Signup />
                {/* <GoogleSignup /> */}
            </GoogleOAuthProvider>
        );
    };

    return (
        <>
            <div className="min-h-screen flex flex-col dark:bg-slate-900 dark:text-white">
                <header>
                    <Navbar updateSearchQuery={setSearchQuery} />
                </header>

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/course"
                            element={
                                authUser ? (
                                    <Courses searchQuery={searchQuery} />
                                ) : (
                                    <Navigate to="/signup" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !authUser ? <Login /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                !authUser ? (
                                    <GoogleWrapper />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                authUser ? <Cart /> : <Navigate to="/signup" />
                            }
                        />
                    </Routes>
                    <Toaster />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default App;
