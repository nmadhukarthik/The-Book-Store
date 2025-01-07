export const calculateTotalQuantity = (cart) => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};
