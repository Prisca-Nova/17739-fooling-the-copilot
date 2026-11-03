// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/link-post-reachable', require('./routes/link-post-reachable'));

module.exports = app;
