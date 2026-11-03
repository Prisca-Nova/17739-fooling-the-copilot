// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/email-template-chosen', require('./routes/email-template-chosen'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));

module.exports = app;
