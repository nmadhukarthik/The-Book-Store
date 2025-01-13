import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const GoogleSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const onSubmit = async (data) => {
        const userInfo = {
            fullname: localStorage.getItem("fullname"),
            email: localStorage.getItem("email"),
            password:
                localStorage.getItem("fullname") +
                localStorage.getItem("email"),
        };
        console.log(userInfo);
        await axios
            .post(`${backendUrl}/user/signup`, userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Signup Sucessfull");
                }
                window.location.reload();
                navigate(from, { replace: true });
                localStorage.setItem("Users", JSON.stringify(res.data.user));
                localStorage.removeItem("fullname");
                localStorage.removeItem("email");
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                );
                console.log(credentialResponseDecoded);
                localStorage.setItem(
                    "fullname",
                    credentialResponseDecoded.name
                );
                localStorage.setItem("email", credentialResponseDecoded.email);
                onSubmit();
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};

export default GoogleSignup;
