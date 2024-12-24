import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
    const [authUser, setAuthUser] = useAuth();
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
            .post("http://localhost:4001/user/login", userInfo)
            // .post("https://book-store-8vla.onrender.com/user/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Logged in Successfully!");
                    // console.log(window.location.pathname)
                    document.getElementById("my_modal_3").close();
                    setTimeout(() => {
                        if (window.location.pathname === "/signup") {
                            navigate("/");
                        } else {
                            window.location.reload();
                        }

                        //window.location.reload()
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
                <div className="modal-box  dark:bg-slate-900 dark:text-white ">
                    {/* </form> */}
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
                                className="w-80 px-3 py-1 border rounded-md outline-none"
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
                                className="w-80 px-3 py-1 border rounded-md outline-none"
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
                            {/* <Link to="/course" > */}
                            <button className="bg-orange-500 text-white rounded-md px-3 py-1 hover:bg-orange-700 duration-200">
                                {" "}
                                Login
                            </button>
                            {/* </Link> */}
                            <p>
                                Not Registered?
                                <Link
                                    to="/signup"
                                    className="underline text-blue-500 cursor-pointer"
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
