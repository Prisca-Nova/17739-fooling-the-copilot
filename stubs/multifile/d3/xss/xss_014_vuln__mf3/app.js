// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.post('/feedback', require('./routes/feedback'));
app.get('/page-that-visitor', require('./routes/page-that-visitor'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
