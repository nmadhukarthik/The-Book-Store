import React, { useEffect, useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import list from '../../public/list.json'
import axios from "axios"
import Cards from './Cards';



const Freebook = () => {

  const [book,setBook] = useState([])

 useEffect(()=> {
    const getBook = async() => {
      try {
        //const res = await axios.get("http://localhost:4001/book")
        const res = await axios.get("https://book-store-8vla.onrender.com/book")
        console.log(res.data)
        setBook(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getBook()
 },[])

  const freeBooks = book.filter((item) => item.category === "Free")
  console.log(freeBooks)

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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <div className={"max-w-screen-2xl container mx-auto md:px-20 px-4"}>
        <div>
          <h1 className='font-semibold text-xl pb-2 underline '> Free Offered Books </h1>
          <p className='text-[18px] italic'> We are offering some books for free to encourage children to start reading books and to make it a habit for great future!!</p>
        <br /></div>

        <div >
          <Slider {...settings}>
            {freeBooks.map((item) => (
              <Cards key={item._id} item={item}></Cards>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Freebook