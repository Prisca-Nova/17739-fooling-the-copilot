// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/products', require('./routes/products'));
app.get('/strings-locale-client', require('./routes/strings-locale-client'));

module.exports = app;
