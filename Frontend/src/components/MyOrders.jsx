import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../redux/orderThunk";
import { useAuth } from "../context/AuthProvider";

const MyOrders = () => {
    const [authUser] = useAuth();
    const userId = authUser?._id;
    const dispatch = useDispatch();
    const {
        items: userOrders,
        loading,
        error,
    } = useSelector((state) => state.orders);

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrder(userId));
        }
    }, [userId, dispatch]);

    if (loading)
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    if (error)
        return (
            <div className="text-center text-lg text-red-500 mt-20">
                <p>Error fetching orders: {error}</p>
                <button
                    onClick={() => dispatch(fetchOrder(userId))}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Retry
                </button>
            </div>
        );

    const sortedOrder = [...userOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="max-w-screen-lg mx-auto p-4 mt-10 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                My Orders
            </h2>
            {sortedOrder.length === 0 ? (
                <p className="mt-10 bg-orange-300 text-base sm:text-lg font-semibold w-full sm:w-96 h-20 flex items-center justify-center rounded-md mx-auto">
                    No orders found
                </p>
            ) : (
                <div className="space-y-4 sm:space-y-6">
                    {sortedOrder.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 dark:bg-gray-900 dark:text-white"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 sm:pb-4 mb-3 sm:mb-4">
                                <p className="text-base sm:text-lg font-semibold">
                                    Order ID:{" "}
                                    <span className="text-gray-600 break-all dark:text-stone-300">
                                        {order._id}
                                    </span>
                                </p>
                                <p className="text-base sm:text-lg font-semibold text-green-400 mt-2 sm:mt-0">
                                    Status: {order.status}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
                                <p className="dark:text-stone-300">
                                    Total Amount:{" "}
                                    <span className="font-semibold ">
                                        ${order.totalAmount}
                                    </span>
                                </p>
                                <p className="dark:text-stone-300">
                                    Ordered on:{" "}
                                    <span className="font-semibold">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                            <ul className="divide-y divide-gray-300">
                                {order.items.map((item) => (
                                    <li
                                        key={item.productId._id}
                                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 py-3 sm:py-4"
                                    >
                                        <img
                                            src={item.productId.image}
                                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md"
                                            alt={item.productId.name}
                                        />
                                        <div className="flex-1">
                                            <p className="text-base sm:text-lg font-semibold">
                                                {item.productId.name}
                                            </p>
                                            <p className="text-gray-600 dark:text-stone-300">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
