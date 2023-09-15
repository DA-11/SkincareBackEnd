//@desc update existing User
//@route PUT /user/update
//@Access public
const asynchHandler = require('express-async-handler');
const User = require('../models/userModel');

const update = asynchHandler (async function(req,res){
    const tokenUser = req.user;
    const mailId = req.params.email;
 
    if(tokenUser.email !== mailId){
        res.status(400);
        throw new Error("You do not have permission to update this user information");
    }

    const user = await User.find({email:mailId});
   
    if(user.length === 0){
        res.status(404);
        throw new Error("user with email provided not found");
    }

    const{username,email,contactNumber} = req.body;
   
    if(!username || !email || !contactNumber){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const updatedUserInfo = await User.findOneAndUpdate(
        {email:req.params.email},
        {
            "username":username,
            "email":email,
            "contactNumber":contactNumber,
        },
        {new:true}
    );

    res.status(200).json(updatedUserInfo);

});

module.exports = update;