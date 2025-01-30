import myOrderModel from "../model/myOrders.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;
        const newOrder = new myOrderModel({ userId, items, totalAmount });
        await newOrder.save();
        res.status(200).json({
            sucess: true,
            message: "Order placed successfully!",
            newOrder,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Error placing order",
            error,
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await myOrderModel
            .find({ userId })
            .populate("items.productId");
        res.status(200).json({ sucess: true, orders });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Error fetching orders",
            error,
        });
    }
};
