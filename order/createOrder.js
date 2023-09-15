const asynchHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
//@desc create new Order
//@route POST /order/create
//@Access private

const create = asynchHandler (async function(req,res){

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
            throw new Error(`Product you are trying to add ${productDetails.product} does not exist in inventory`);
        }
    }

    const order = await Order.create({
        customerEmail,
        products,
        address,
        price
    });

    res.status(200).json({"Order":order._id});
});

module.exports = create;