// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.get('/health', require('./routes/health'));
app.get('/worker-process-still/:pid', require('./routes/worker-process-still'));
app.post('/settings', require('./routes/settings'));
app.post('/feedback', require('./routes/feedback'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));
app.get('/users/:id', require('./routes/profile'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
