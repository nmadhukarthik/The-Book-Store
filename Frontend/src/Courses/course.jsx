import React from "react";
// import { Navbar } from '../components/Navbar'
import Course from "../components/Course";
// import Footer from '../components/Footer'

const Courses = ({ searchQuery }) => {
    return (
        <>
            {/* <Navbar/> */}
            <div className="min-h-screen mt-[-50px] py-20">
                <Course searchQuery={searchQuery} />
            </div>
            {/* <Footer/> */}
        </>
    );
};

export default Courses;
