import myOrderModel from "../model/myOrders.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;

        // Validate request body
        if (
            !userId ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0 ||
            !totalAmount
        ) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid order data" });
        }

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
