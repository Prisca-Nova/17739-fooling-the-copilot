// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/badge-color-picked', require('./routes/badge-color-picked'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
