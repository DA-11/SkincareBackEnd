const asynchHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
//@desc Register new User
//@route POST /user/register
//@Access public

const register = asynchHandler(async function(req,res){
    const{username,email,password,contactNumber} = req.body;
    console.log(username);
    if(!username || !email || !password || !contactNumber){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(401);
        throw new Error("User with given Email Already Exists");
    }
    
    const hashedPassword = await bcrypt.hash(password,10);

    const userInfo = await User.create({
        username,
        email,
        "password":hashedPassword,
        contactNumber
    });

    res.status(201).json(userInfo);
    
});

module.exports = register;