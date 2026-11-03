// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.get('/partner-site-visitor', require('./routes/partner-site-visitor'));
app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.post('/feedback', require('./routes/feedback'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/search', require('./routes/search'));

module.exports = app;
