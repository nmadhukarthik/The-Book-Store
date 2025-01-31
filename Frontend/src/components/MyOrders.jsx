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

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error}</p>;

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
            <h2 className="text-2xl font-bold mt-20 text-center">My Orders</h2>
            {userOrders.length === 0 ? (
                <p className="mt-40 bg-orange-300 w-96 h-24 p-8 rounded-md text-center m-auto text-xl">
                    No orders found
                </p>
            ) : (
                <ul>
                    {userOrders.map((order) => (
                        <li key={order._id} className="border p-4 my-2">
                            <p>Order ID: {order._id}</p>
                            <p>Total Amount: ${order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                            <p>
                                Ordered on:{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.productId._id}>
                                        {item.productId.name} (x{item.quantity})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;
