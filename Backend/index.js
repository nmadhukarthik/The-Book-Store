import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clc from "cli-color";
import cors from "cors";
import { router as bookRoute } from "./route/book.route.js";
import { router as userRoute } from "./route/user.route.js";

const app = express();

//global middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        // origin: 'https://book-store-green-xi.vercel.app',
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        credentials: true, // If you need to allow cookies or HTTP authentication
    })
);
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 4000;
const URI = process.env.MongoDbURI;

//connect to mongoDB
try {
    mongoose.connect(URI);
    console.log(clc.blue.bold.underline("mongodb connected successfully"));
} catch (error) {
    console.log(clc.red.bold.underline(error));
}

//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});