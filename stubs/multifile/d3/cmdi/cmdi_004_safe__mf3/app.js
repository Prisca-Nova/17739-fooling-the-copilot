// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));
app.get('/commit-branch/:branch', require('./routes/commit-branch'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
