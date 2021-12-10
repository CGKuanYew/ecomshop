import React from 'react'
import Header from '../components/Header'
import Image from "next/image"
import CheckoutProduct from '../components/CheckoutProduct'
import {selectItems} from "../slices/basketSlice"
import {useSelector} from "react-redux"
import CurrencyFormat from 'react-currency-format';
import {useSession} from "next-auth/react";

function Checkout() {
    const items = useSelector(selectItems);
    const {data:session} = useSession();
   
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

            <div>
                {items.length> 0 && (
                    <>
                    <h2>
                        Subtotal ({items.length}items):
                        <span className="font-bold">

                        {/* <CurrencyFormat 
                        className="font-bold "
                        value={price} 
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'MYR'} /> */}
                        </span> 
                    </h2>

                        <button className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                            {!session?"Sign in to checkout" : "Proceed to checkout"}
                        </button>
                    </>
                )}
            </div>
       </main>

        </div>
    )
}

export default Checkout
