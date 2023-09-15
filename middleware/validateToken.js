const asynchHandler = require('express-async-handler');
const JWT = require('jsonwebtoken');

const validateToken = asynchHandler(async function(req,res,next){

    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(authHeader && authHeader.startsWith('Bearer')){

        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_KEY, (err,decoded) => {
            if(err){
                res.status(400);
                throw new Error('user is not authorized');
            }

            console.log(decoded.user);
            req.user = decoded.user;
            next();
        })
    } else {
        res.status(404);
        throw new Error("Access token not found");
    }
});

module.exports = validateToken;