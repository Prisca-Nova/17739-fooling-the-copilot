// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/document-public-folder', require('./routes/document-public-folder'));
app.get('/stats', require('./routes/stats'));
app.get('/orders', require('./routes/orders'));
app.get('/health', require('./routes/health'));

module.exports = app;
