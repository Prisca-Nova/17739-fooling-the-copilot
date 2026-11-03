// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/feedback', require('./routes/feedback'));
app.post('/draft-post-confirmation', require('./routes/draft-post-confirmation'));
app.get('/search', require('./routes/search'));
app.get('/stats', require('./routes/stats'));
app.get('/version', require('./routes/version'));
app.get('/health', require('./routes/health'));
app.post('/settings', require('./routes/settings'));

module.exports = app;
