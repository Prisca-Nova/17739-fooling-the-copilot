// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/dns-records-domain', require('./routes/dns-records-domain'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
