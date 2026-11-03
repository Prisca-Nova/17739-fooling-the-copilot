// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/version', require('./routes/version'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/products', require('./routes/products'));
app.get('/users/:id', require('./routes/profile'));
app.get('/flag-file-json', require('./routes/flag-file-json'));
app.post('/feedback', require('./routes/feedback'));
app.get('/stats', require('./routes/stats'));
app.get('/search', require('./routes/search'));

module.exports = app;
