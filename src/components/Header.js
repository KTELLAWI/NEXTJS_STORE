import React from 'react'
import Image from 'next/image'
import {MenuAlt3Icon, MenuIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import {signIn,signOut,useSession} from 'next-auth/client'
import {Router, useRouter} from 'next/router'
import {selectItems} from '../slices/basketSlice'
import { useSelector} from 'react-redux'



export default function Header() {
    const [session,loading]= useSession()
    const router= useRouter();
    const items =  useSelector(selectItems)

    return (
        <header className=' '>
        {/* TOP NAV */}
         <div className="flex absolute  sticky top-0 items-center bg-white drop-shadow-lg p-1 flex-grow py-2  justify-center z-50">
         <div className="mt-2  sticky top-0 flex items-center flex-grow sm:flex-grow-0">
             <Image
             onClick={() =>router.push('/')}
             src="http://wordpress.aromainsider.work/wp-content/uploads/2021/03/cropped-aroma-insider-logo-instagram.jpg"
             width={290}
             height={60}
             objectFit="contain"
             className="cursor-pointer "

             />
         </div>
         <div className=' bg-yellow-400 hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow cursor-pointer  '>
         <input type="text"
             className="p-2 h-10 w-6 flex-grow flex-shrink rounded-l-md border-solid border-4 border-yellow-400 px-4 focus:outline-none"
         />
         <SearchIcon
             className="h-12 p-4 hover:bg-yellow-400 rounded-md  "
         />

         </div>
         <div className='text-black flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
             {/**Right */}
             <div onClick={!session ? signIn : signOut}  className=' link'>
                 <p className='hover: underline'>{session ? `Hello, ${session.user.name}` : "SignIn"}</p>
                 <p className='font-extrabold md:text-sm'>Account & lists</p>
             </div>
             <div  onClick={()=> router.push('/orders')}
             className=' link'>
             <p className='font-extrabold md:text-sm'>return</p>
                 <p className='font-extrabold md:text-sm'>orders</p>
             </div>
             <div className='relative flex items-center  link'>
             <span className='absolute top-0 right-0  md:right-15 h-4 w-4 bg-yellow-300 text-center rounded-full text-black font-bold'>{items.length}</span>
                 <ShoppingBagIcon
                     className="h-10 "
                     onClick={() =>router.push('/checkout')}
                 />
                 <p className=' hidden md:inline font-extrabold md:text-sm'>Basket</p>
             </div>
         </div>
         
         

         </div>
        {/* Bottom NAV */}
{/**  
         <div className="flex items-center bg-blue-400 text-sm space-x-3 pl-6">
         <p className='link flex items-center'>
             <MenuAlt3Icon className="h-6 mr-1"/>
             ALL
         </p>
         <p className='link'>Prime Video</p>
         <p className='link'>Amazone BUSINESS Video</p>
         <p className='link'>Today's Deales</p>
         <p className='link hidden lg:inline-flex'>Electronics</p>
         <p className='link hidden lg:inline-flex'>Food and grocery</p>
         <p className='link hidden lg:inline-flex'>prime</p>
         <p className='link hidden lg:inline-flex'>shopper toolkit</p>
         <p className='link hidden lg:inline-flex'>health and personal care</p>




         </div>
            */}
        </header>
    )
}
