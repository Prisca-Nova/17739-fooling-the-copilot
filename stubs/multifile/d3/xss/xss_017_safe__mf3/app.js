// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/orders', require('./routes/orders'));
app.get('/product-list-unknown', require('./routes/product-list-unknown'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
