import express from "express";
import {
    getUserCart,
    addToCart,
    removeFromCart,
    clearCart,
} from "../controller/cart.controller.js";

export const router = express.Router();

router.get("/:userId", getUserCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/clear", clearCart);
