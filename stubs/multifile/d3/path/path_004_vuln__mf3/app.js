// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/attachment', require('./routes/attachment'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));

module.exports = app;
