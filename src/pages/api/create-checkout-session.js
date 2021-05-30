const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req,res) => {
    const {items,email } = req.body;
    console.log(email)
    console.log(items)
    console.log("GGGGGG")

    const transformedItem =items.map((item )=>({
        description:items.description,
        quantity:1,
        price_data:{
            currency:"gbp",
            unit_amount:item.price* 100,
            product_data:{
                name:item.title,
                images:[item.image]
            }
                    }

    })
        

    )
    const session= await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        shipping_rates:['shr_1IwRprFWb6mUX8aCJZlKjK5o'],
        shipping_address_collection:{
            allowed_countries:['GB','US','CA']
        },
        line_items: transformedItem,
        mode:'payment',
        success_url:`${process.env.host}/success`,
        cancel_url:`${process.env.host}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(item=> item.image))

        }
    })

res.status(200).json({
    id:session.id
})
}