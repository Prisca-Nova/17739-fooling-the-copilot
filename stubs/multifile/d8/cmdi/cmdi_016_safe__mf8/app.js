// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.post('/feedback', require('./routes/feedback'));
app.get('/orders', require('./routes/orders'));
app.get('/users/:id', require('./routes/profile'));
app.post('/settings', require('./routes/settings'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/search', require('./routes/search'));
app.post('/weekly-digest-address', require('./routes/weekly-digest-address'));

module.exports = app;
