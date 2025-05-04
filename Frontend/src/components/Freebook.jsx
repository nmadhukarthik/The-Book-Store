import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { useSelector } from "react-redux";

const Freebook = () => {
    const {
        items: books,
        loading,
        error,
    } = useSelector((state) => state.books);

    console.log(books);
    const freeBooks = books.filter((item) => item.category === "Free");
    // console.log(freeBooks);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    {
        if (loading) {
            return <div>Loading....</div>;
        } else if (error || books.length === 0) {
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
                        <div>
                            <h1 className="font-semibold text-xl pb-2 underline ">
                                {" "}
                                Free Offered Books{" "}
                            </h1>
                            <p className="text-[18px] italic">
                                {" "}
                                We are offering some books for free to encourage
                                children to start reading books and to make it a
                                habit for great future!!
                            </p>
                            <br />
                        </div>

                        <div>
                            <Slider {...settings}>
                                {freeBooks.map((item) => (
                                    <Cards key={item._id} item={item}></Cards>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Freebook;
