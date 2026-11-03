// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));
app.get('/translation-file-i/:lang', require('./routes/translation-file-i'));

module.exports = app;
