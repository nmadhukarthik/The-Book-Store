import React from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Course = ({ searchQuery }) => {
    const {
        items: books,
        loading,
        error,
    } = useSelector((state) => state.books);

    const filteredBooks = books.filter(
        (book) =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    {
        if (loading) {
            return <div>Loading....</div>;
        } else if (error || books.length === 0 || filteredBooks.length === 0) {
            return (
                <div className="mt-40 bg-orange-300 w-96 h-24 p-8 rounded-md text-center m-auto text-xl">
                    {error
                        ? "Failed to load books. Please try again."
                        : "No books to show"}
                </div>
            );
        } else {
            return (
                <>
                    <div
                        className={
                            "max-w-screen-2xl container mx-auto md:px-20 px-4"
                        }
                    >
                        <div className="mt-28  text-center">
                            {/* items-center justify-center  */}
                            <h1 className="text-2xl md:text-4xl">
                                We are delighted to have you{" "}
                                <span className="text-orange-500">
                                    here!! :){" "}
                                </span>
                            </h1>
                            <p className="mt-12">
                                Hurry up!! Buy your favourite books as long as
                                the stocks last. Visit again later to know about
                                the new arrivals!
                            </p>
                            <Link to="/">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 duration-300 mt-6">
                                    Back{" "}
                                </button>
                            </Link>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 ">
                            {(filteredBooks ? filteredBooks : books).map(
                                (item) => (
                                    <Cards key={item._id} item={item} />
                                )
                            )}
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Course;
