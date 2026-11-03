// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.get('/shared-file-share/:file', require('./routes/shared-file-share'));
app.post('/feedback', require('./routes/feedback'));
app.get('/orders', require('./routes/orders'));
app.get('/stats', require('./routes/stats'));
app.get('/version', require('./routes/version'));
app.post('/settings', require('./routes/settings'));

module.exports = app;
