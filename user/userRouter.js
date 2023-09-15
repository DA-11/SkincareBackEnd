const express = require('express');
const userRouter = express.Router();
const register = require('./registerUser');
const deleteUser = require('./deleteUser');
const update = require('./updateUser');
const validateToken = require('../middleware/validateToken');

userRouter.route('/register').post(register);

userRouter.use(validateToken);
userRouter.route('/delete/:email').delete(deleteUser);
userRouter.route('/update/:email').put(update);


module.exports = userRouter;