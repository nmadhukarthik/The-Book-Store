import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${backendUrl}/contact/contactUs`,
                formData
            );
            toast.success(
                response.data.message || "Message sent successfully!"
            );
            setFormData({ name: "", email: "", message: "" }); // Reset form
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(
                error.response?.data?.message || "Failed to send message"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-20 p-5 bg-gray-100 rounded-lg shadow-md  dark:bg-slate-900 dark:text-white">
            <h1 className="text-3xl font-bold text-center text-orange-500">
                Contact Us
            </h1>
            <p className="text-center text-gray-600 mt-2 dark:text-white">
                Have questions? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 text-black bg-white border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full p-2 text-black bg-white border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-white">
                        Message
                    </label>
                    <textarea
                        className="w-full p-2 text-black bg-white border border-gray-300 rounded-md dark:bg-slate-900 dark:text-white "
                        rows="4"
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md w-full"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Contact;
