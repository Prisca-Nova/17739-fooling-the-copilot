// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/health', require('./routes/health'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));
app.post('/file-workspace', require('./routes/file-workspace'));

module.exports = app;
