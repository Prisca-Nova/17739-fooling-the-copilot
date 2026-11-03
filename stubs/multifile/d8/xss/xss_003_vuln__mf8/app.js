// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));
app.post('/submitted-comment-preview', require('./routes/submitted-comment-preview'));

module.exports = app;
