import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from "react-router-dom"

import Home from './Home/Home'
//import Course from './components/Course'
import Courses from './Courses/course'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider';
import { GoogleOAuthProvider } from "@react-oauth/google"
import Cart from './components/Cart';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [authUser, setAuthUser] = useAuth()
    console.log(authUser)

   const GoogleWrapper = () => {
    return(
      <GoogleOAuthProvider clientId='856582538119-kpep1k9vl4kdmse6qntktfgnaddusgbq.apps.googleusercontent.com'>  
        <Signup/>             
        {/* <GoogleSignup /> */}
      </GoogleOAuthProvider>
    )}
      
   
  return (
    <>
    <div className="min-h-screen flex flex-col dark:bg-slate-900 dark:text-white">
      <header>
        <Navbar/>
      </header>
    
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course' element={authUser? <Courses/> : <Navigate to="/signup"/>} />
          <Route path='/signup' element={<GoogleWrapper />} />
          <Route path='/cart' element={<><Cart /></>} />
        </Routes>
        <Toaster />
      </main>
      <Footer/>
      </div>
    </>
  )
}

export default App