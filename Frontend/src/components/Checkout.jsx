import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const Checkout = ({subTotal}) => {

    function tokenHandler(token){
        console.log(token)
    }


  return (
    <div>

    <StripeCheckout
      amount = {subTotal*100}
      shippingAddress
      token={tokenHandler}
      stripeKey="pk_test_51QATveP70aoJEPJCZm5P6CEgFMlJguS4FxKQ4rQUue5lyS8PgcWNUn8ypWOIVmtSX2GJwG5ow4flYl3h8MdApO5500WGBURIAw"
      currency='SGD'
    >
        <button className='btn bg-orange-500 w-[230px] cursor-pointer px-2  rounded-full border-[2px] hover:bg-orange-400 hover:text-white duration-200  dark:text-white max-w-screen-2xl container mx-auto md:px-20 '>
            Pay Now 
        </button>
    </StripeCheckout>

    </div>
  )
}

export default Checkout