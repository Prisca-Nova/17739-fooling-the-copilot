// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.get('/hook-checks-out', require('./routes/hook-checks-out'));
app.get('/orders', require('./routes/orders'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.post('/settings', require('./routes/settings'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/users/:id', require('./routes/profile'));

module.exports = app;
