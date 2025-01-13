import express from "express";
import { payment } from "../controller/payment.controller.js";

export const router = express.Router();

router.post("/pay", payment);
