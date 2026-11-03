// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/settings', require('./routes/settings'));
app.get('/stats', require('./routes/stats'));
app.post('/feedback', require('./routes/feedback'));
app.get('/product-image', require('./routes/product-image'));
app.get('/health', require('./routes/health'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));

module.exports = app;
