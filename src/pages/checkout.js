import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import {selectItems, selectTotal} from '../slices/basketSlice'
import { useSelector} from 'react-redux'
import CheckOutProduct from '../components/CheckOutProduct'
import Currency from 'react-currency-formatter';
import {signIn,signOut,useSession} from 'next-auth/client'
import {loadStripe  } from "@stripe/stripe-js";
const stripePromise= loadStripe("pk_test_51IwGD6FWb6mUX8aC9hBYOjylwiyVG9Ihrfa9ysprMDbla3hpeOXgGMkqmuj80FHQYwxX2gCYS3f85sghpWLZjlQE00LNhiESpj")
import axios from 'axios'




export default function Checkout() {
   const creatCheckoutSession = async ()=>{
       const stripe = await stripePromise

       // call the backend to creat session 
       const checkoutSession = await axios.post('/api/create-checkout-session',{
           items:items,
           email:session.user.email
       })

       // redirect user to Stripe Checkout
       
       console.log(items)


   }
   


    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    console.log(items)
    console.log(total)

    const [session,loading]= useSession()


    return (
        <div className='bg-gray-100'>
              <div className=" sticky top-0 z-50">

        <Header/>
        </div>
        <main className='lg:flex max-w-screen-2xl max-auto'>
            {/**left */}

            <div className='flex-grow m-5 shadow-sm'>
                <Image
                src="https://links.papareact.com/ikj"
                width={1020}
                height={250}
                objectFit="contain"


                />
                <div className='flex flex-col p-5 space-y-10 bg-white'>
                    <h1 className=' text-3xl shadow-md border-b pb-4'>{items.length=== 0 ?" Your Basket is empty" : "Shopping Basket:"}</h1>
                   

                    {items.map((item,i)=>( 
                        
                        <CheckOutProduct
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





            {/**right */}
        <div className={ `flex flex-col p-10 ${ items.length> 0 && `bg-gradient-to-t from-yellow-300 to-transparent shadow-lg`}`}> 

            {items.length > 0 && (
                <>
                <h2 className='whitespace-nowrap'> Subtotal (  {items.length} items): 
                <span className='font-bold'>
                <Currency className='font-bold'quantity={total} currency="GBP" />

                </span>
                </h2>
                <button 
                role='link'
                onClick={creatCheckoutSession}
                disabled={!session}
                className={`button mt-2  ${!session && `from-gray-300 to-gray-500 border-gray-200 text-white cursor-not-allowed`}`}>
                    {!session? 'Sigin to Checkout' : 'Proceed to Checkout'}
                </button >
                </>
            )}
        </div>


            </main>
        </div>
    )
}
