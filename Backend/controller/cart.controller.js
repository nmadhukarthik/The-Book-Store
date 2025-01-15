import cart from "../model/cart.model.js";
import { calculateTotalQuantity } from "../utils/cartUtils.js";

export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log("Fetching cart for userId:", userId);
        const Cart = await cart.findOne({ userId }).populate("items.productId");
        if (!Cart) return res.json({ items: [], totalQuantity: 0 });
        res.json({
            ...Cart.toObject(),
            totalQuantity: calculateTotalQuantity(Cart),
        });
    } catch (error) {
        console.error("Error fetching cart:", error); // Log full error
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let Cart = await cart.findOne({ userId });

        if (!Cart) {
            Cart = new cart({ userId, items: [] });
        }

        const itemIndex = Cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (itemIndex > -1) {
            Cart.items[itemIndex].quantity += 1;
        } else {
            Cart.items.push({ productId, quantity: 1 });
        }
        await Cart.save();
        res.json({
            ...Cart.toObject(),
            totalQuantity: calculateTotalQuantity(Cart),
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
};

export const decrementCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let Cart = await cart.findOne({ userId });

        if (!Cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = Cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            if (Cart.items[itemIndex].quantity > 1) {
                Cart.items[itemIndex].quantity -= 1; // Decrease quantity
            } else {
                Cart.items.splice(itemIndex, 1); // Remove item if quantity reaches zero
            }
            await Cart.save();
            res.json({
                ...Cart.toObject(),
                totalQuantity: calculateTotalQuantity(Cart),
            });
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error decrementing item in cart" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const Cart = await cart.findOne({ userId });

        if (!Cart) return res.status(404).json({ message: "Cart not found" });

        Cart.items = Cart.items.filter(
            (item) => item.productId.toString() !== productId
        );
        await Cart.save();
        res.json({
            ...Cart.toObject(),
            totalQuantity: calculateTotalQuantity(Cart),
        });
    } catch (error) {
        res.status(500).json({ message: "Error removing item" });
    }
};

// export const clearCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const updatedCart = await cart.findOneAndUpdate(
//             { userId },
//             { $set: { items: [], totalQuantity: 0 } }, // Empty the items and reset totalQuantity
//             { new: true } // Return the updated document
//         );
//         res.json({ success: true, message: "Cart cleared", updatedCart });

//         // await cart.findOneAndDelete({ userId });
//         // res.json({ message: "Cart cleared" });
//     } catch (error) {
//         res.status(500).json({ message: "Error clearing cart" });
//     }
// };

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;
        // console.log("Received userId:", userId); // Log the received userId

        const updatedCart = await cart.findOneAndUpdate(
            { userId },
            { $set: { items: [], totalQuantity: 0 } },
            { new: true }
        );

        if (!updatedCart) {
            return res
                .status(404)
                .json({ success: false, message: "Cart not found" });
        }

        // console.log("Updated Cart:", updatedCart); // Log the updated cart document

        res.json({ success: true, message: "Cart cleared", updatedCart });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({
            success: false,
            message: "Error clearing cart",
        });
    }
};
