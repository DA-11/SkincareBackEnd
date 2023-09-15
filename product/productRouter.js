const express = require('express');
const productRouter = express.Router();
const deleteProduct = require('./deleteProduct');
const create = require('./createProduct');
const read = require('./readProduct');
const update = require('./updateProduct');
const getAllProducts = require('./getAllProducts');
const validateToken = require('../middleware/validateToken');

productRouter.use(validateToken);
productRouter.route('/create').post(create);
productRouter.route('/get/:productName').get(read);
productRouter.route('/all').get(getAllProducts);
productRouter.route('/update/:productName').put(update);
productRouter.route('/delete/:productName').delete(deleteProduct);

module.exports = productRouter;