const mongoose = require('mongoose');
const Product = require('../models/productModel');

const cartSchema = mongoose.Schema({
    customerEmail:{
        type:String,
        required:[true,'Provide customer email']
    },
    products: [
        {
            product:String,
            quantity:Number
        }
    ],
    price:{
        type:Number,
        required:[true,'Please provide a grand total']
    },
    taxPercentage:{
        type:Number,
        required:[true,'Please mention the tax levied']
    },
    total:{
        type:Number,
        required:[true,'Please provide a grand total after tax']
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Cart',cartSchema);
