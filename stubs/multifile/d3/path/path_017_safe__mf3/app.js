// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/products', require('./routes/products'));
app.get('/flag-file-json', require('./routes/flag-file-json'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
