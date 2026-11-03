// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.get('/health', require('./routes/health'));
app.get('/cache-flush-tenant', require('./routes/cache-flush-tenant'));
app.get('/users/:id', require('./routes/profile'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
