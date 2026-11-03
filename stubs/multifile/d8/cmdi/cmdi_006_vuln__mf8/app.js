// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.post('/feedback', require('./routes/feedback'));
app.get('/health', require('./routes/health'));
app.post('/settings', require('./routes/settings'));
app.post('/latest-export-format', require('./routes/latest-export-format'));
app.get('/search', require('./routes/search'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));

module.exports = app;
