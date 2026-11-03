// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/search', require('./routes/search'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));
app.get('/health', require('./routes/health'));
app.get('/product-list-unknown', require('./routes/product-list-unknown'));
app.get('/products', require('./routes/products'));

module.exports = app;
