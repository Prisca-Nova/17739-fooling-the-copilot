// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.get('/products', require('./routes/products'));
app.get('/health', require('./routes/health'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/configuration-backup', require('./routes/configuration-backup'));
app.get('/users/:id', require('./routes/profile'));
app.get('/search', require('./routes/search'));
app.get('/orders', require('./routes/orders'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
