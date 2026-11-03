// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.get('/health', require('./routes/health'));
app.get('/image', require('./routes/image'));

module.exports = app;
