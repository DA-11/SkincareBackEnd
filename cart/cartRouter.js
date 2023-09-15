const express = require('express');
const cartRouter = express.Router();
const validateToken = require('../middleware/validateToken');

const create = require('./createCart');
const deleteCart = require('./deleteCart');
const update = require('./updateCart');
const readOrder = require('./readCart');
const getAllCarts = require('./getAllCarts');

cartRouter.use(validateToken);

cartRouter.route('/create').post(create);
cartRouter.route('/delete/:_id').delete(deleteCart);
cartRouter.route('/get/:_id').get(readOrder);
cartRouter.route('/update/:_id').put(update);
cartRouter.route('/all').get(getAllCarts);

module.exports = cartRouter;