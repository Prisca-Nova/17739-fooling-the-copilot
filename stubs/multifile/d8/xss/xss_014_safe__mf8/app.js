// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/users/:id', require('./routes/profile'));
app.get('/search', require('./routes/search'));
app.get('/health', require('./routes/health'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/feedback', require('./routes/feedback'));
app.get('/products', require('./routes/products'));
app.get('/page-that-visitor', require('./routes/page-that-visitor'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
