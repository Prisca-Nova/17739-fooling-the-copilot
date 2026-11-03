// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.post('/feedback', require('./routes/feedback'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/health', require('./routes/health'));
app.get('/users/:id', require('./routes/profile'));
app.get('/orders', require('./routes/orders'));
app.post('/contents-uploaded-archive', require('./routes/contents-uploaded-archive'));

module.exports = app;
