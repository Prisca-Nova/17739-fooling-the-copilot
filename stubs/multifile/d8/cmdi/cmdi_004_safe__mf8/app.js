// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/stats', require('./routes/stats'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.get('/version', require('./routes/version'));
app.post('/feedback', require('./routes/feedback'));
app.get('/commit-branch/:branch', require('./routes/commit-branch'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
