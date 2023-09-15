const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');

//@desc get all Products
//@route GET /product/all
//@Access private

const getAllProducts = asynchHandler(async function(req,res){
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
});

module.exports = getAllProducts;
