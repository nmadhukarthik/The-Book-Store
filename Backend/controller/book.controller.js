import Book from "../model/book.model.js";
// import { successResponse, errorResponse } from "../utils/response.js";

export const getBook = async (req, res) => {
    try {
        const books = await Book.find();
        // return successResponse(res, books, "Books fetched successfully");
        res.status(200).json(books);
    } catch (error) {
        console.log("Error fetching books: ", error);
        // return errorResponse(res, "Failed to fetch books", error);
        res.status(500).json(error);
    }
};
