import mongoose from "mongoose";

const myOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Delivered" }, // e.g., Pending, Shipped, Delivered
    createdAt: { type: Date, default: Date.now },
});

const myOrderModel = mongoose.model("MyOrder", myOrderSchema);
export default myOrderModel;
