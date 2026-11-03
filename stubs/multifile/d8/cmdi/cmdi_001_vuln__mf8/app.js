// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/lines-uploaded-report', require('./routes/lines-uploaded-report'));
app.get('/search', require('./routes/search'));
app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));

module.exports = app;
