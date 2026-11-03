// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.post('/latest-export-format', require('./routes/latest-export-format'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));

module.exports = app;
