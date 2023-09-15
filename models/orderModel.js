const mongoose = require('mongoose');
const Product = require('../models/productModel');

const orderSchema = mongoose.Schema({
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
    address:{
        type:String,
        require:[true,'Please Provide address for Delivery']
    },
    price:{
        type:Number
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Order',orderSchema);
