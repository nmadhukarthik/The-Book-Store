import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { fetchBooks } from "./redux/thunk.js";

const App = () => {
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useAuth();

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

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
                    <Navbar />
                </header>

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/course"
                            element={
                                authUser ? (
                                    <Courses />
                                ) : (
                                    <Navigate to="/signup" />
                                )
                            }
                        />
                        <Route path="/signup" element={<GoogleWrapper />} />
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
