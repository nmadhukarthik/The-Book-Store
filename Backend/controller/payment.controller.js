import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
export const payment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        console.log("Processing Payment:", token, amount);
        if (!token) {
            return res
                .status(400)
                .json({ success: false, message: "No payment token provided" });
        }

        const charge = await stripe.charges.create({
            amount,
            currency: "sgd",
            source: token.id,
            description: "Book Store Payment",
        });

        console.log("Payment Successful:", charge);
        res.status(200).json({ success: true, charge });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
