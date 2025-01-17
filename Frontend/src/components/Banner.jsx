import React from "react";
import banner from "../../public/booksPic.png";
import { useAuth } from "../context/AuthProvider";
export const Banner = () => {
    const [authUser, setAuthUser] = useAuth();
    return (
        <>
            <div className=" flex flex-col md:flex-row max-w-screen-2xl container mx-auto md:px-20 px-4 my-10">
                <div className=" order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32 ">
                    <div className="space-y-12">
                        <h1 className="text-4xl font-bold ">
                            Hello, welcome <br />
                            <span className="text-orange-500 ">
                                {authUser?.fullname.toUpperCase() || "user"}!{" "}
                            </span>
                            Learn something new everyday.
                        </h1>
                        <p className="text-xl italic">
                            Books are referred to as a man’s best friend. They
                            are very beneficial for mankind and have helped it
                            evolve. There is a powerhouse of information and
                            knowledge. Books offer us so many things without
                            asking for anything in return.
                            <span className="underline text-orange-500">
                                Books leave a deep impact on us and are
                                responsible for uplifting our mood.
                            </span>
                            Books are of great importance to mankind. They
                            enhance our knowledge and vocabulary. They keep us
                            entertained and also widen our perspective. This, in
                            turn, makes us more confident and wise.
                        </p>
                    </div>
                </div>
                <div className="order-1 mt-20 w-full md:w-1/2">
                    <img
                        src={banner}
                        className="md:w-[600px] md:h-[460px] md:ml-12"
                        alt="books image"
                    />
                </div>
            </div>
        </>
    );
};
