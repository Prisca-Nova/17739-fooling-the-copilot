// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/log-lines-matching', require('./routes/log-lines-matching'));
app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.post('/settings', require('./routes/settings'));
app.get('/search', require('./routes/search'));

module.exports = app;
