const asynchHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//@desc read all carts
//@route get /cart/all
//@Access private

const getAllCarts = asynchHandler(async function(req,res){
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
});

module.exports = getAllCarts;