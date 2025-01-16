import React from "react";

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto mt-20 p-5 bg-gray-100 rounded-lg shadow-md  dark:bg-slate-900 dark:text-white">
            <h1 className="text-3xl font-bold text-center text-orange-500">
                Contact Us
            </h1>
            <p className="text-center text-gray-600 mt-2 dark:text-white">
                Have questions? We'd love to hear from you.
            </p>

            <form className="mt-6">
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Message
                    </label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white"
                        rows="4"
                        placeholder="Your Message"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-md w-full"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
