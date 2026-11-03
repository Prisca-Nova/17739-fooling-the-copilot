// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.post('/settings', require('./routes/settings'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));
app.get('/users/:id', require('./routes/profile'));
app.get('/link-post-reachable', require('./routes/link-post-reachable'));

module.exports = app;
