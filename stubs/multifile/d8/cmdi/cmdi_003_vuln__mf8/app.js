// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/package-installed-version', require('./routes/package-installed-version'));
app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.get('/search', require('./routes/search'));
app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
