// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.get('/products', require('./routes/products'));
app.post('/item-shopping-list', require('./routes/item-shopping-list'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));

module.exports = app;
