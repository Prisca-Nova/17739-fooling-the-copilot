// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.post('/settings', require('./routes/settings'));
app.get('/translation-file-i/:lang', require('./routes/translation-file-i'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/products', require('./routes/products'));

module.exports = app;
