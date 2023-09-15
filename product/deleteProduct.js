const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');

//@desc delete existing Product
//@route DELETE /product/delete
//@Access private

const deleteProduct = asynchHandler(async function(req,res){

    const name = req.params.productName;
    
    const product = await Product.findOne({name});
    if(!product){
        res.status(404);
        throw new Error("No product with given name exists in inventory");
    }

    const deleteProduct = await Product.deleteOne({name});
    res.status(200).json({"message":"Product successfully deleted",deleteProduct});

});

module.exports = deleteProduct;    