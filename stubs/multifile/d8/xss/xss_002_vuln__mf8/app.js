// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/term-above-empty', require('./routes/term-above-empty'));
app.get('/version', require('./routes/version'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.post('/settings', require('./routes/settings'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
