const asynchHandler = require('express-async-handler');

const verifyToken = asynchHandler(async function(req,res,next){

    const tokenUserEmail = req.user.email;

    if(tokenUserEmail !== process.env.ADMIN_ID){
        res.status(401);
        throw new Error("Only Admin user can perform this function"); 
    } else {
        next();
    }
});

module.exports = verifyToken;