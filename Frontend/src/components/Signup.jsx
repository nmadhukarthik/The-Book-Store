import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
// import googleImage from "../assets/google.jpg"
// import { useGoogleLogin } from "@react-oauth/google"
// import GoogleSignup from './GoogleSignup'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        };

        await axios
            // .post("https://book-store-8vla.onrender.com/user/signup", userInfo)
            .post(`${backendUrl}/user/signup`, userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Signup Sucessfull");
                }
                if (window.location.pathname === "/signup") {
                    navigate("/login");
                    // window.location.reload();
                }
                // navigate(from, { replace: true });
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };

    // const googleResponse = async (authResult) => {
    //     try {
    //         console.log(authResult)
    //         // if(authResult['code']){
    //         //     const result = await googleAuth(authResult['code'])
    //         //     const {email,name} = result.data.user
    //         //     console.log('result.data.user.......', result.data.user)
    //         // }
    //     } catch (error) {
    //         // console.error("Error while requesting google code: ", error)
    //     }
    //     // document.getElementById("my_modal_3").close()
    // }

    // const googleLogin = useGoogleLogin({
    //     onSuccess: googleResponse,
    //     onError: googleResponse,
    //     flow: 'auth-code'
    // })

    return (
        <>
            <div className="flex justify-center h-screen items-center ">
                <div className=" w-[600px]">
                    <div className="modal-box text-black bg-white dark:bg-slate-700 dark:text-white">
                        <form onSubmit={handleSubmit(onSubmit)} method="dailog">
                            {/* if there is a button in form, it will close the modal */}
                            <Link
                                to="/"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </Link>

                            <h3 className="font-bold text-lg"> Signup </h3>

                            {/* name */}
                            <div className="mt-4 space-y-2">
                                <span>Name</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter your Full name"
                                    className="w-80 px-3 py-1 border rounded-md outline-none text-black bg-white  dark:bg-slate-900 dark:text-white"
                                    {...register("fullname", {
                                        required: true,
                                    })}
                                />
                                <br />
                                {errors.fullname && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            {/* email */}
                            <div className="mt-4 space-y-2">
                                <span>Email</span>
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-80 px-3 py-1 border rounded-md outline-none text-black bg-white  dark:bg-slate-900 dark:text-white"
                                    {...register("email", { required: true })}
                                />
                                <br />
                                {errors.email && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            {/* password */}
                            <div className="mt-4 space-y-2">
                                <span>Password</span>
                                <br />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-80 px-3 py-1 border rounded-md outline-none text-black bg-white  dark:bg-slate-900 dark:text-white"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <br />
                                {errors.password && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            {/* button */}
                            {/* <Login/> */}
                            <div className="mt-4 flex justify-around">
                                <button className="bg-orange-500 text-white rounded-md px-3 py-1 hover:bg-orange-700 duration-200">
                                    {" "}
                                    Signup{" "}
                                </button>
                                <p className="text-xl">
                                    Have Account?
                                    <Link
                                        to="/login"
                                        className="underline text-blue-500 cursor-pointer"
                                        onClick={() =>
                                            document
                                                .getElementById("my_modal_3")
                                                .showModal()
                                        }
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>

                            <br />
                            <hr />
                            <br />
                            {/* <GoogleSignup/> */}
                        </form>
                        {/* <button className='bg-pink-500 text-white m-auto rounded-md px-3 py-1 w-[400px] flex justify-center items-center gap-5 hover:bg-pink-700 duration-200'
                                onClick={googleLogin} 
                                >
                            <img src={googleImage} className='w-9 h-9 rounded-full' />
                            Signup with Google
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
