const asynchHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//@desc delete existing Order
//@route delete /order/delete/:_id
//@Access private

const deleteOrder = asynchHandler(async function(req,res){
    const _id = req.params._id;
    console.log(_id)
    if(!_id){
        res.status(404);
        throw new Error("Please send orderId as parameter with request");
    }

    const order = await Order.find({_id});
    if(!order){
        res.status(404);
        throw new Error("Could not find any order under given order id");
    }

    const deleteOrder = await Order.deleteOne({_id});
    res.status(200).json({"Order deleted":order});
});

module.exports = deleteOrder;
