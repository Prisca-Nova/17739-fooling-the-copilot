// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/partner-site-visitor', require('./routes/partner-site-visitor'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.get('/products', require('./routes/products'));

module.exports = app;
