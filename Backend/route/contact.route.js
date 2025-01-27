import express from "express";
import contactUs from "../controller/contactUs.controller.js";

export const router = express.Router();

router.post("/contactUs", contactUs);
