import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({children}) {

    const [cartItems,setCartItems] = useState({})

    const addToCart = (itemId) => {
        if(!cartItems[itemId])
        { setCartItems((prev)=>({...prev,[itemId]:1}))}
        else
        //increase the quantity
        { setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => {
    //       if (prev[itemId] > 1) {
    //         return {...prev, [itemId]: prev[itemId] - 1};
    //       } else {
    //         const newCartItems = {...prev};
    //         delete newCartItems[itemId];
    //         return newCartItems;
    //       }
    //     });
    //   }


    const initialAuthUser = localStorage.getItem("Users")
    const [authUser, setAuthUser] = useState(initialAuthUser? JSON.parse(initialAuthUser) : undefined)
 
    


    return (
        <AuthContext.Provider value={[authUser, setAuthUser, addToCart, removeFromCart, cartItems, setCartItems]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)