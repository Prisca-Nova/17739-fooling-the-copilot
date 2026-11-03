// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.post('/feedback', require('./routes/feedback'));
app.get('/report-name', require('./routes/report-name'));
app.get('/version', require('./routes/version'));

module.exports = app;
