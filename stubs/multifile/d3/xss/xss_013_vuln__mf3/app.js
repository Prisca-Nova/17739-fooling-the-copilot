// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/not-found-page/:slug', require('./routes/not-found-page'));
app.get('/version', require('./routes/version'));
app.get('/products', require('./routes/products'));

module.exports = app;
