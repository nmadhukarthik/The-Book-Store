import cart from "../model/cart.model";

export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const Cart = await cart.findOne({ userId }).populate("items.productId");
        if (!Cart) return res.json({ items: [], totalQuantity: 0 });
        // Calculate total quantity
        const totalQuantity = Cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        res.json({ ...Cart.toObject(), totalQuantity });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        const totalQuantity = Cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        res.json({ ...Cart.toObject(), totalQuantity });
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
            const totalQuantity = Cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            res.json({ ...Cart.toObject(), totalQuantity });
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
        const totalQuantity = Cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        res.json({ ...Cart.toObject(), totalQuantity });
    } catch (error) {
        res.status(500).json({ message: "Error removing item" });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;
        await cart.findOneAndDelete({ userId });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart" });
    }
};
