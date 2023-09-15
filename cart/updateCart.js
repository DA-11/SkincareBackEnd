const asynchHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
//@desc update existing cart
//@route put /cart/update/:_id
//@Access private

const update = asynchHandler(async function(req,res){
    
    const _id = req.params._id;
    console.log(_id)
    if(!_id){
        res.status(404);
        throw new Error("Please send orderId as parameter with request");
    }

    const cart = await Cart.findOne({_id});
    if(!cart){
        res.status(404);
        throw new Error("Could not find any order under given order id");
    }

    const{customerEmail,products,price,taxPercentage,total} = req.body;
    const userEmail = req.user.email;

    if(customerEmail !== userEmail){
        res.status(400);
        throw new Error("You can create cart for yourself only");
    }
    
    console.log(products);
    for(let i = 0 ; i < products.length ; i++){
        let productDetails = products[i];
        const productExist = await Product.findOne({name:productDetails.product}); 

        if(!productExist){
            res.status(404);
            throw new Error(`Product you are trying to add "${productDetails.product}" does not exist in inventory`);
        }
    }

    const updatedCart = await Cart.findOneAndUpdate(
        {_id},
        {
            customerEmail,
            products,
            price,
            taxPercentage,
            total
        },
        {new:true}
    );

    res.status(200).json(updatedCart);
});

module.exports = update;