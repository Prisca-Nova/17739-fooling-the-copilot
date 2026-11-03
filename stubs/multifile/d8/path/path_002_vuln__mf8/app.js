// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/invoice-pdf-file/:file', require('./routes/invoice-pdf-file'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.get('/health', require('./routes/health'));

module.exports = app;
