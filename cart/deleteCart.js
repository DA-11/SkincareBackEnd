const asynchHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//@desc delete existing Order
//@route delete /cart/delete/:_id
//@Access private

const deleteCart = asynchHandler(async function(req,res){
    const _id = req.params._id;
    console.log(_id)
    if(!_id){
        res.status(404);
        throw new Error("Please send CartId as parameter with request");
    }

    const cart = await Cart.find({_id});
    if(!cart){
        res.status(404);
        throw new Error("Could not find any order under given order id");
    }

    const deleteCart = await Cart.deleteOne({_id});
    res.status(200).json({"Cart deleted":cart});
});

module.exports = deleteCart;
