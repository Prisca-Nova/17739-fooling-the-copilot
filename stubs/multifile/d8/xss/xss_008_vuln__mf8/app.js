// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/search', require('./routes/search'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.get('/number-pagination-bar', require('./routes/number-pagination-bar'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/version', require('./routes/version'));

module.exports = app;
