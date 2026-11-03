// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.get('/products', require('./routes/products'));
app.get('/thumbnail-uploaded-image', require('./routes/thumbnail-uploaded-image'));

module.exports = app;
