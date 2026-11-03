// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.get('/hook-checks-out', require('./routes/hook-checks-out'));

module.exports = app;
