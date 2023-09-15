const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');

//@desc update Product details
//@route POST /product/update
//@Access private

const update = asynchHandler(async function(req,res){

    const product_name = req.params.productName;
    const product = await Product.findOne({"name":product_name});

    if(!product){
        res.status(404);
        throw new Error("Product with given name does not exists in inventory");
    }

    const {
        name,
        category,
        description,
        price,
        quantity,
        imageUrl,
        rating
    } = req.body;

    if(!name ||
       !category ||
       !description ||
       !price ||
       !quantity ||
       !imageUrl || 
       !rating)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    if(name !== product_name){
        const productWithChangedName = await Product.findOne({name});
        if(productWithChangedName){
           res.status(403);
           throw new Error("cannot change name to already existing product"); 
        }
    }

    const updatedProduct = await Product.findOneAndUpdate(
        {name:product_name},
        {
            name,
            category,
            description,
            price,
            quantity,
            imageUrl,
            rating
        },
        {new:true}
    );

    res.status(200).json({"message":"Updated product details",updatedProduct});


});

module.exports = update;