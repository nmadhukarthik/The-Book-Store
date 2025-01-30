import express from "express";
import { getMyOrders, placeOrder } from "../controller/myOrders.controller.js";

export const router = express.Router();
router.get("/:userId", getMyOrders);
router.post("/placeOrder", placeOrder);
