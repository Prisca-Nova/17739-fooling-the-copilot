// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.get('/health', require('./routes/health'));
app.get('/log-file-logs', require('./routes/log-file-logs'));
app.get('/search', require('./routes/search'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
