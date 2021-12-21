import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import CurrencyFormat from 'react-currency-format';
import {useDispatch} from "react-redux";
import {addToBasket, removeFromBasket} from "../slices/basketSlice" 

function CheckoutProduct(
{id,
title,
price,
rating,
description,
category,
image,
hasPrime,
}) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
        id,
       title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime,
         };
         //Push item into redux
         dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }

    return (
        <div className='grid grid-cols-5'>
            <Image src={image} height={200} width={200} objectFit="contain"/>
            
        <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className="flex">
                {Array(rating)
                .fill()
                .map((_, i) =>(
                    <StarIcon key={i} className="h-5 text-yellow-500"/>
                
                ))}
            </div>

            <p className="text-xs my-2 line-clamp-3">{description}</p>

           <CurrencyFormat 
           className="font-bold "
           value={price} 
           displayType={'text'}
           thousandSeparator={true}
           prefix={'MYR'} />

        {hasPrime && (
            <div className="flex items-centerr space-x-2">
                <img
                    loading="lazy"
                    className='w-12'
                    src="https://links.papareact.com/fdw"
                    alt=""
                />
                <p className="text-xs text-gray-500">FREE Next-day Deliver</p>

            </div>
        )}
         </div>

          <div className="flex flex-col space-y-2 my-auto justify-self-end">
            <button className='buttonDesign' onClick={addItemToBasket}>Add to Basket</button>
            <button className='buttonDesign' onClick={removeItemFromBasket}>Remove from Basket</button>
          </div>
        </div>
    )
}

export default CheckoutProduct
