import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'
// import list from '../../public/list.json'
import { Link } from 'react-router-dom'


const Course = () => {

//  const paidBooks = list.filter((book) => book.category !== "Free")
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

  return (
    <>
       <div className={'max-w-screen-2xl container mx-auto md:px-20 px-4'}>
        <div className='mt-28  text-center'> 
            {/* items-center justify-center  */}
            <h1 className='text-2xl md:text-4xl'>
                We are delighted to have you <span className='text-orange-500'>here!! :) </span> 
            </h1>
            <p className='mt-12'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Rem non doloribus odit error quos nam molestias veritatis amet ex! Nulla accusantium assumenda, 
            velit dicta sed laboriosam officiis aliquam architecto aspernatur.
            </p>
            <Link to="/"> 
            <button className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 duration-300 mt-6'> 
              Back </button>
            </Link>
           
        </div>

        <div className='mt-12 grid grid-cols-1 md:grid-cols-4 '>
          { book.map((item) => <Cards key={item._id} item={item}/>)}
        </div>
       </div>
    </>
  )
}

export default Course