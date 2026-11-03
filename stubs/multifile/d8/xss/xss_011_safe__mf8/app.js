// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/badge-color-picked', require('./routes/badge-color-picked'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/settings', require('./routes/settings'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));

module.exports = app;
