// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.post('/membership-system-account', require('./routes/membership-system-account'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.get('/search', require('./routes/search'));
app.post('/feedback', require('./routes/feedback'));
app.get('/orders', require('./routes/orders'));
app.get('/stats', require('./routes/stats'));
app.get('/users/:id', require('./routes/profile'));

module.exports = app;
