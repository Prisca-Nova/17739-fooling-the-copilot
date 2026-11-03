// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.post('/settings', require('./routes/settings'));
app.get('/orders', require('./routes/orders'));
app.get('/version', require('./routes/version'));
app.get('/health', require('./routes/health'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/theme', require('./routes/theme'));

module.exports = app;
