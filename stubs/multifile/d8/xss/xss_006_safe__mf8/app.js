// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/feedback', require('./routes/feedback'));
app.get('/flash-message-through', require('./routes/flash-message-through'));
app.get('/users/:id', require('./routes/profile'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));

module.exports = app;
