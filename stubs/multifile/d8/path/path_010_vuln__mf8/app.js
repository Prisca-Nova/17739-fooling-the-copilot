// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.post('/settings', require('./routes/settings'));
app.get('/search', require('./routes/search'));
app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/report-name', require('./routes/report-name'));
app.get('/orders', require('./routes/orders'));
app.post('/feedback', require('./routes/feedback'));

module.exports = app;
