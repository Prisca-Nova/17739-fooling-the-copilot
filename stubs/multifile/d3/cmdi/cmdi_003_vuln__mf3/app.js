// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/package-installed-version', require('./routes/package-installed-version'));
app.get('/version', require('./routes/version'));

module.exports = app;
