const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel')
//@desc create new Order
//@route POST /order/create
//@Access private

const create = asynchHandler (async function(req,res){

    const{customerEmail,products,price,taxPercentage,total} = req.body;
    const userEmail = req.user.email;

    if(customerEmail !== userEmail){
        res.status(400);
        throw new Error("You can create for yourself only");
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

    const cart = await Cart.create({
        customerEmail,
        products,
        price,
        taxPercentage,
        total
    });

    res.status(200).json({"Cart":cart._id});
});

module.exports = create;