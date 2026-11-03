// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.post('/feedback', require('./routes/feedback'));
app.get('/email-template-chosen', require('./routes/email-template-chosen'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
