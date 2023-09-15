const express = require('express');
const orderRouter = express.Router();
const create = require('./createOrder');
const validateToken = require('../middleware/validateToken');
const deleteOrder = require('./deleteOrder');
const update = require('./updateOrder');
const readOrder = require('./readOrder');
const getAllOrders = require('./getAllOrders');

orderRouter.use(validateToken);

orderRouter.route('/create').post(create);
orderRouter.route('/delete/:_id').delete(deleteOrder);
orderRouter.route('/get/:_id').get(readOrder);
orderRouter.route('/update/:_id').put(update);
orderRouter.route('/all').get(getAllOrders);

module.exports = orderRouter;