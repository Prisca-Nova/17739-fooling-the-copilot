// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/health', require('./routes/health'));
app.post('/settings', require('./routes/settings'));
app.get('/not-found-page/:slug', require('./routes/not-found-page'));
app.get('/users/:id', require('./routes/profile'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
