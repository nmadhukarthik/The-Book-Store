import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Login() {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/login") {
            document.getElementById("my_modal_3").showModal();
        } // Automatically open modal on navigation
    }, [location.pathname]);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        await axios
            .post(`${backendUrl}/user/login`, userInfo)
            // .post("https://book-store-8vla.onrender.com/user/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Logged in Successfully!");
                    // console.log(window.location.pathname)
                    document.getElementById("my_modal_3").close();
                    setTimeout(() => {
                        if (
                            window.location.pathname === "/login" ||
                            window.location.pathname === "/signup"
                        ) {
                            navigate("/");
                            window.location.reload();
                        } else {
                            window.location.reload();
                        }

                        localStorage.setItem(
                            "Users",
                            JSON.stringify(res.data.user)
                        );
                    }, 1000);
                    //navigate("/course")
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                    setTimeout(() => {}, 2000);
                }
            });
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box text-black bg-white dark:bg-slate-700  dark:text-white ">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link
                            to="/"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() =>
                                document.getElementById("my_modal_3").close()
                            }
                        >
                            ✕
                        </Link>

                        <h3 className="font-bold text-lg"> Login </h3>

                        {/* email */}
                        <div className="mt-4 space-y-2">
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-80 px-3 py-1 border rounded-md outline-none text-black bg-white dark:bg-slate-900  dark:text-white"
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
                                className="w-80 px-3 py-1 border rounded-md outline-none text-black bg-white dark:bg-slate-900  dark:text-white"
                                {...register("password", { required: true })}
                            />
                            <br />
                            {errors.password && (
                                <span className="text-sm text-red-500">
                                    This field is required
                                </span>
                            )}
                        </div>
                        {/* button */}
                        <div className="mt-4 flex justify-around">
                            <button className="bg-orange-500 text-white rounded-md px-3 py-1 hover:bg-orange-700 duration-200">
                                {" "}
                                Login
                            </button>
                            <p>
                                Not Registered?
                                <Link
                                    to="/signup"
                                    className="underline text-blue-500 cursor-pointer"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_3")
                                            .close()
                                    }
                                >
                                    Signup
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
