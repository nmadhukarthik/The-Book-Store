import React from 'react'
//import banner from '../../public/books_banner.png'
import banner from '../../public/booksPic.png'
export const Banner = () => {
    return (
        <>
            <div className=' flex flex-col md:flex-row max-w-screen-2xl container mx-auto md:px-20 px-4 my-10'>
                <div className=' order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32 '>
                    <div className='space-y-12'>
                        <h1 className='text-4xl font-bold '>
                            Hello, welcome here to learn something <span className='text-orange-500'> new everyday!!!</span> </h1>
                        <p className='text-xl italic'> Books are referred to as a man’s best friend. They are very beneficial for mankind and have helped it evolve. 
                            There is a powerhouse of information and knowledge. Books offer us so many things without asking for anything in return. 
                            <span className='underline text-orange-500'>Books leave a deep impact on us and are responsible for uplifting our mood.</span> Books are of great importance to mankind. 
                            They enhance our knowledge and vocabulary. They keep us entertained and also widen our perspective. 
                            This, in turn, makes us more confident and wise.</p>

                        {/* <label className="  input input-bordered flex items-center gap-2  dark:bg-slate-800 dark:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow " placeholder="Email" /> 
                        </label>
                       
                        <button className="mt-6 btn bg-orange-500 text-white"> Get Started </button> */}

                     </div>
                </div>
                <div className='order-1 mt-20 w-full md:w-1/2'>
                    <img 
                        src={banner} 
                        className='md:w-[600px] md:h-[460px] md:ml-12'  
                        alt="books image" />
                
                </div>
            </div>



        </>
    )
}
