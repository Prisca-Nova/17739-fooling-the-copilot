// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.get('/endpoint-service-status', require('./routes/endpoint-service-status'));
app.get('/users/:id', require('./routes/profile'));
app.get('/health', require('./routes/health'));
app.post('/settings', require('./routes/settings'));
app.get('/version', require('./routes/version'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/stats', require('./routes/stats'));
app.get('/search', require('./routes/search'));

module.exports = app;
