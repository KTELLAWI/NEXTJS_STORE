import { CheckCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import Header from '../components/Header'
import {useRouter} from 'next/router'

export default function success() {
    const router = useRouter()
    return (
        <div className='bg-gray-300 h-screen '>
        <Header/>
        <main className='max-w-screen-lg mx-auto mt-5'>
        <div className='flex flex-col p-10 bg-white'>
            <div className='flex items-center space-x-2 mb-5 '>
                <CheckCircleIcon
                    className="h-10 text-blue-900"
                />
                <h1 className='text-3xl'>Thank you, Your Order has benn confirmed !</h1>

            </div>
            <p>
            thank you for shipping with us.We will send a confirmation of items has shipped ,
             if you would like to check the status of order please press the lik below

            </p>
            <button
            onClick={() => router.push('/orders')}
             className='button mt-8'>
             Go to My Orders
            </button>
        </div>


        </main>

            
        </div>
    )
}
