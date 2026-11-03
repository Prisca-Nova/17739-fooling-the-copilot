// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/version', require('./routes/version'));
app.get('/endpoint-service-status', require('./routes/endpoint-service-status'));
app.post('/settings', require('./routes/settings'));

module.exports = app;
