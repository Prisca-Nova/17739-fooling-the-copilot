// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/greeting-hello-lang/:lang', require('./routes/greeting-hello-lang'));
app.get('/products', require('./routes/products'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
