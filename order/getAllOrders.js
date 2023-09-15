const asynchHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//@desc read all Orders
//@route get /order/all
//@Access private

const getAllOrders = asynchHandler(async function(req,res){
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
});

module.exports = getAllOrders;