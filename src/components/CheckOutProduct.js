import React from 'react'
import Image from 'next/image'
import { StarIcon, StatusOnlineIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter';
import {useDispatch} from 'react-redux'
import {addToBasket} from '../slices/basketSlice'
import {removeFromBasket} from '../slices/basketSlice'




export default function CheckOutProduct({id,title,price,description,category,image,hasPrime,rating}) {

    const dispatch = useDispatch();

    const addItemToBasket = () =>{
        const product = {
            id,title,price,description,category,image,hasPrime

        };
         // sending product as an action to redux store .... the basket slice 
        dispatch(addToBasket(product))
    }
const removeItemFromBasket =()=>{
    //remove from redux
    dispatch(removeFromBasket({id}))

}

    return (
    <div  className=" grid grid-cols-8">
        <div className='col-span-1'>
        <Image
            src={image}
            width={200}
            height={200}
            objectFit='contain'
        />

        </div>
        
        
     <div className="  col-span-3 mx-5 ">
        <p>{title}</p>
        <div className='flex'>
            {Array(rating).fill().map((_,i)=>( 
                <StarIcon
                    key={i}
                    className='h-5 text-yellow-500'
                    
                />

            ))}
        </div>

        <p className='text-xs mt-2 mb-2 line-clamp-3'>
            {description}
        </p>
        <Currency
            quantity={price}
            currency="GBP"
        />
        
        {hasPrime && (
            <div className='flex items-center space-x-2'>
            <img loading='lazy'  className='w-12'src="https://links.papareact.com/fdw" alt="" />
            <p className='text-xs text-gray-500'>Free Next Day Delivery</p>

            </div>
        )}

    </div>
       {/**rigt column add/remove to from cart */}
        <div className = 'flex  flex-col space-y-2 my-auto justify-self-end'>
        <button className='button'  onClick={addItemToBasket}>Add to Basket</button>
        <button className='button ' onClick={removeItemFromBasket}>Remove from Basket</button>

             
        </div>

    
    </div>
    )
}
