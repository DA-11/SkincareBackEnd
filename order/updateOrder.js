const asynchHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
//@desc update existing Order
//@route put /order/update/:_id
//@Access private

const update = asynchHandler(async function(req,res){
    
    const _id = req.params._id;
    console.log(_id)
    if(!_id){
        res.status(404);
        throw new Error("Please send orderId as parameter with request");
    }

    const order = await Order.findOne({_id});
    if(!order){
        res.status(404);
        throw new Error("Could not find any order under given order id");
    }

    const{customerEmail,products,address,price} = req.body;
    const userEmail = req.user.email;

    if(customerEmail !== userEmail){
        res.status(400);
        throw new Error("You can place order for yourself only");
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

    const updatedOrder = await Order.findOneAndUpdate(
        {_id},
        {
            customerEmail,
            products,
            address,
            price
        },
        {new:true}
    );

    res.status(200).json(updatedOrder);
});

module.exports = update;