const asynchHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//@desc read existing Order
//@route get /order/get/:_id
//@Access private

const getOrder = asynchHandler(async function(req,res){
    
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

    res.status(200).json({"Order details":order});

});

module.exports = getOrder;