// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/log-lines-matching', require('./routes/log-lines-matching'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
