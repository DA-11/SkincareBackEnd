const asynchHandler = require('express-async-handler');
const Product = require('../models/productModel');

//@desc Create new Product
//@route POST /product/create
//@Access private

const create = asynchHandler(async function(req,res){
    const {
        name,
        category,
        description,
        price,
        quantity,
        imageUrl,
        rating} = req.body;

    if(!name ||
       !category || 
       !description || 
       !price || 
       !quantity ||
       !imageUrl || 
       !rating){
        res.status(400);
        throw new Error("All Fields are mandatory");
       }    

    const productAvailable = await Product.findOne({name});
    if(productAvailable){
        res.status(401);
        throw new Error("Product with given name already exists");
    }
    
    const product = await Product.create({
        name,
        category,
        description,
        price,
        quantity,
        imageUrl,
        rating
    });

    res.status(201).json(product);
});

module.exports = create;
