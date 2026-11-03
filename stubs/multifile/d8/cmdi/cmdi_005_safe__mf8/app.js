// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/settings', require('./routes/settings'));
app.get('/health', require('./routes/health'));
app.get('/search', require('./routes/search'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/disk-usage-project', require('./routes/disk-usage-project'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
