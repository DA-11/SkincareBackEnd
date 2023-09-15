const asynchHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//@desc read existing Order
//@route get /cart/get/:_id
//@Access private

const getCart = asynchHandler(async function(req,res){
    
    const _id = req.params._id;
    console.log(_id)
    if(!_id){
        res.status(404);
        throw new Error("Please send cartId as parameter with request");
    }

    const cart = await Cart.findOne({_id});
    if(!cart){
        res.status(404);
        throw new Error("Could not find any cart under given order id");
    }

    res.status(200).json({"Cart details":cart});

});

module.exports = getCart;