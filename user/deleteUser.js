const User = require('../models/userModel');
const asynchHandler = require('express-async-handler');

//@desc Delete existing User
//@route delete /user/delete
//@Access private

const deleteUser = asynchHandler(async function(req,res){
 
   const mailId = req.params.email;
   console.log(mailId);

   const user = await User.find({email:mailId});
   
   if(user.length === 0){
       res.status(404);
       throw new Error("user with email provided not found");
   }
  
   const deletedUser = await User.deleteOne({email:mailId});
   res.status(200).json(deletedUser);

});

module.exports = deleteUser;