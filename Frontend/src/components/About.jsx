import React from "react";

const About = () => {
    return (
        <div className="max-w-4xl mx-auto mt-20 p-5 bg-gray-100 rounded-lg shadow-md  dark:bg-slate-900 dark:text-white">
            <h1 className="text-3xl font-bold text-center text-orange-500">
                About Us
            </h1>
            <p className="text-gray-600 mt-4 text-center dark:text-white">
                Welcome to{" "}
                <span className="font-semibold dark:text-gray-400">
                    The Book Store
                </span>
                , your one-stop shop for all kinds of books. Our mission is to
                make reading accessible and enjoyable for everyone.
            </p>

            <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
                    📚 Wide Collection
                </h2>
                <p>
                    We offer a diverse collection of books ranging from fiction,
                    non-fiction, educational, and more.
                </p>

                <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
                    🚀 Fast Delivery
                </h2>
                <p>
                    Get your favorite books delivered quickly to your doorstep.
                </p>

                <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
                    ❤️ Customer First
                </h2>
                <p>
                    Our support team is always available to help you with your
                    orders and inquiries.
                </p>
            </div>
        </div>
    );
};

export default About;
