// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/n-lines-application', require('./routes/n-lines-application'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/health', require('./routes/health'));

module.exports = app;
