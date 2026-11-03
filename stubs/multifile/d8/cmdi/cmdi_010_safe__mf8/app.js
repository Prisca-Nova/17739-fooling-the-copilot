// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/stats', require('./routes/stats'));
app.get('/users/:id', require('./routes/profile'));
app.get('/search', require('./routes/search'));
app.get('/dns-records-domain', require('./routes/dns-records-domain'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.get('/health', require('./routes/health'));

module.exports = app;
