// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/products', require('./routes/products'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/visitor-landing-page', require('./routes/visitor-landing-page'));
app.get('/version', require('./routes/version'));

module.exports = app;
