const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDb = require('./congif/dbConfiguration');
const errorHandler = require('./middleware/errorHandler');

connectDb();

const port = process.env.PORT || 5001;

const userRouter = require('./user/userRouter');
const productRouter = require('./product/productRouter');
const orderRouter = require('./order/orderRouter');
const cartRouter = require('./cart/cartRouter');

const login = require('./auth/login');

app.use(cors());

app.use(express.json());

app.post('/Login',login);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/cart',cartRouter);

app.use(errorHandler);

app.listen(port, ()=>{
    console.log("server listening at port",port);
});