// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/number-pagination-bar', require('./routes/number-pagination-bar'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));

module.exports = app;
