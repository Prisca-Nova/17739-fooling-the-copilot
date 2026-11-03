// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));
app.post('/help-page-markdown', require('./routes/help-page-markdown'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.get('/orders', require('./routes/orders'));
app.post('/settings', require('./routes/settings'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
