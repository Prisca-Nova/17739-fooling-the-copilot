// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.post('/profile-bio-line', require('./routes/profile-bio-line'));
app.get('/stats', require('./routes/stats'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));
app.post('/settings', require('./routes/settings'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.get('/search', require('./routes/search'));

module.exports = app;
