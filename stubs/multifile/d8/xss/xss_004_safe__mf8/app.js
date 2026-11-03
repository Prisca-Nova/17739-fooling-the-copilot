// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.get('/profile-header-users/:user', require('./routes/profile-header-users'));
app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/health', require('./routes/health'));
app.get('/search', require('./routes/search'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
