// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/products', require('./routes/products'));
app.get('/version', require('./routes/version'));
app.get('/log-file-logs', require('./routes/log-file-logs'));

module.exports = app;
