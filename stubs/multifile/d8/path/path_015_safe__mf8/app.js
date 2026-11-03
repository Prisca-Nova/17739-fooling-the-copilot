// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.post('/feedback', require('./routes/feedback'));
app.get('/documentation-index-release', require('./routes/documentation-index-release'));

module.exports = app;
