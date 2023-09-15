const asynchHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User =require('../models/userModel');

//@desc Login existing User
//@route  /Login
//@Access public

const login = asynchHandler(async function(req,res){

    const {email,password} = req.body;
    console.log(email);
    console.log(password);
    
    if(email === process.env.ADMIN_ID){
        if(password === process.env.ADMIN_KEY){
            const token = JWT.sign({
                user : {
                    username : process.env.ADMIN_USERNAME,
                    email : process.env.ADMIN_ID,
                },
    
            },
                process.env.JWT_KEY,
                {expiresIn : "30m"}
            );

            res.status(200).send(token);
            return;
            
        } else {
            res.status(400);
            throw new Error("Admin password not correct");
        }
    }

    const user = await User.findOne({email});
    
    if(!email || !password){
        res.status(400);
        throw new Error('Please provide email and password in order to login');
    }

    if(user && await bcrypt.compare(password,user.password)){

        const token = JWT.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id,
            },

        },
            process.env.JWT_KEY,
            {expiresIn : "30m"}
        );

        res.status(200).send(token);
    } else {
        res.status(404);
        throw new Error('Password do not match or email does not exist!! please try again with diffrent credentials');
    }

});

module.exports = login;