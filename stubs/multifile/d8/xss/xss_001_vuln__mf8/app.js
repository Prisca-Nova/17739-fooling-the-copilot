// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/version', require('./routes/version'));
app.get('/users/:id', require('./routes/profile'));
app.get('/search', require('./routes/search'));
app.get('/visitor-landing-page', require('./routes/visitor-landing-page'));
app.get('/orders', require('./routes/orders'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
