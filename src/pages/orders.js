import React from 'react'
import Header from '../components/Header'
import {useSession,getSession} from 'next-auth/client'
import db from '../../firebase';
import moment from 'moment'
import Order from '../components/Order';


export default function orders({orders}) {
    const [session] = useSession();
    console.log('orders',orders)
    return (
        <div>
              <div className=" sticky top-0 z-50">

        <Header/>
        </div>
        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                Your orders
            </h1> 


            {session ? (
                <h2> orders:{orders.length}</h2>
            ) : (
                <h2>Please sigin to see your orders</h2>
            )}
            <div className='mt-5 space-y-4'>
            {orders?.map(({id,amount,amountShipping, items, timestamp,images}) =>(
                <Order

                    id={id}
                    key={id}
                    amount={amount}
                    amountShipping={amountShipping}
                    items={items}
                    timestamp={timestamp}
                    images={images}
                />
            ))}

            </div>

        </main>
        
            
        </div>
    )
}

export  async function getServerSideProps (context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    //get the users logged in credential
    const session = await getSession(context);

    if(!session){
        return{
            props: {

            }
        }
    }
    // firebase DB
    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders')
    .orderBy('timestamp','desc').get();


// stripe Orders
const orders = await Promise.all(
    stripeOrders.docs.map(async (order) =>({ 
        id:order.id,
        amount:order.data().amount,
        amountShipping:order.data().amount_shipping,
        images:order.data().images,
        timestamp:moment(order.data().timestamp.toDate()).unix(),
        items:(
            await stripe.checkout.sessions.listLineItems(order.id,{
                limit:100
            })

        ).data,





    }))
    )

  return{
      props:{
          orders,
          session:session
      }
  }
}
