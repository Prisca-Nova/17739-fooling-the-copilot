// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/cache-flush-tenant', require('./routes/cache-flush-tenant'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
