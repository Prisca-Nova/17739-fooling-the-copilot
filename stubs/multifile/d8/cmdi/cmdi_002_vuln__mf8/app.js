// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/settings', require('./routes/settings'));
app.get('/search', require('./routes/search'));
app.get('/orders', require('./routes/orders'));
app.get('/users/:id', require('./routes/profile'));
app.post('/host-network-diagnostics', require('./routes/host-network-diagnostics'));
app.get('/health', require('./routes/health'));

module.exports = app;
