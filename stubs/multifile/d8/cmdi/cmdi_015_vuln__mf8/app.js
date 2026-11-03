// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/search', require('./routes/search'));
app.get('/users/:id', require('./routes/profile'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/orders', require('./routes/orders'));
app.get('/thumbnail-uploaded-image', require('./routes/thumbnail-uploaded-image'));

module.exports = app;
