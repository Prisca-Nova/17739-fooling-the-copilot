// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/orders', require('./routes/orders'));
app.get('/search', require('./routes/search'));
app.get('/tags-filter-sidebar', require('./routes/tags-filter-sidebar'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));

module.exports = app;
