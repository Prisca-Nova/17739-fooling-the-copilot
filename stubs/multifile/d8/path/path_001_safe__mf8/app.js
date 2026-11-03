// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/health', require('./routes/health'));
app.get('/users/:id', require('./routes/profile'));
app.get('/document-public-folder', require('./routes/document-public-folder'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
