// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/version', require('./routes/version'));
app.post('/feedback', require('./routes/feedback'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.post('/settings', require('./routes/settings'));
app.get('/strings-locale-client', require('./routes/strings-locale-client'));

module.exports = app;
