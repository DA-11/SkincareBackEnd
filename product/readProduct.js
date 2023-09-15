const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');

//@desc get Product details
//@route get /product/read
//@Access private

const getProduct = asynchHandler(async function(req,res){

    const name = req.params.productName;
    
    const product = await Product.findOne({name});
    if(!product){
        res.status(404);
        throw new Error("No product with given name exists in inventory");
    }

    const productDetail = await Product.findOne({name});
    res.status(200).json(productDetail);
});

module.exports = getProduct;