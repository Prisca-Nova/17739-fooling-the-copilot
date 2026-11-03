// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.post('/settings', require('./routes/settings'));
app.get('/health', require('./routes/health'));
app.get('/orders', require('./routes/orders'));
app.get('/n-lines-application', require('./routes/n-lines-application'));
app.get('/search', require('./routes/search'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
