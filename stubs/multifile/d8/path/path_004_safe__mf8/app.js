// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/attachment', require('./routes/attachment'));
app.post('/feedback', require('./routes/feedback'));
app.get('/health', require('./routes/health'));
app.get('/version', require('./routes/version'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
