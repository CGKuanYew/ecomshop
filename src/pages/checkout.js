import React from 'react'
import Header from '../components/Header'
import Image from "next/image"
import CheckoutProduct from '../components/CheckoutProduct'
import {selectItems, selectTotal} from "../slices/basketSlice"
import {useSelector} from "react-redux"
import CurrencyFormat from 'react-currency-format';
import {useSession} from "next-auth/react";
import {loadStripe} from "@stripe/stripe-js"
import axios from 'axios'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const {data:session} = useSession();
   
    const  createCheckoutSession = async () =>  {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
            items: items,
            email:session.user.email,

        })

        //Redirect user/customer to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })
        if (result.error) alert(result.error.message);
    }
    return (
        <div className="bg-gray-100">
              <Header />
       <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
            <Image 
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            />

            <div className="flex flex-col p-5 space-y-10 bg-white">
                <h1 className="text-3xl border-b pb-4">
                {items.length ===0
                    ?"Your Amazon Basket is empty."
                    :" Shopping Basket"}
                </h1>

                {items.map((item,i)=> (
                    <CheckoutProduct
                        key={i}
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        price={item.price}
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        hasPrime={item.hasPrime}  
                    />

                ))}

            </div>
        </div>

            <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length> 0 && (
                    <>
                    <h2>
                        Subtotal ({items.length}items):
                        <span className="font-bold">

                        <CurrencyFormat 
                        className="font-bold "
                        value={total} 
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'MYR'} />
                        </span> 
                    </h2>

                        <button 
                        role="link"
                        onClick={createCheckoutSession}
                        className={`buttonDesign mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                            {!session?"Sign in to checkout" : "Proceed to checkout"}
                        </button>

                        {/* <button 
                        role="link"
                        onClick={createCheckoutSession}
                        className="buttonDesign mt-2"
                        >Proceed to Check Out </button> */}
                    </>
                )}
            </div>
       </main>

        </div>
    )
}

export default Checkout
