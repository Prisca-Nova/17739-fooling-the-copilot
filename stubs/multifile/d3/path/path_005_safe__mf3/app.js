// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.get('/product-image', require('./routes/product-image'));

module.exports = app;
