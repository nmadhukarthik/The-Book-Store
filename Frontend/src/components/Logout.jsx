import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { persistor } from "../redux/store";
// import { PiShoppingCartSimpleFill } from "react-icons/pi";

function Logout() {
    const [authUser, setAuthUser] = useAuth();
    console.log(authUser);

    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null,
            });
            localStorage.removeItem("Users");
            // persistor.purge();
            toast.success("Logged out Successfully");

            setTimeout(() => {
                if (window.location.pathname === "/") {
                    window.location.reload();
                } else {
                    navigate("/");
                    window.location.reload();
                }
            }, 1000);
        } catch (error) {
            toast.error("Error: " + error);
            setTimeout(() => {}, 2000);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-5">
            <button
                className="px-3 py-2 bg-orange-500 rounded-md text-white cursor-pointer"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
