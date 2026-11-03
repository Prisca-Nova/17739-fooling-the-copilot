// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/tags-filter-sidebar', require('./routes/tags-filter-sidebar'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));

module.exports = app;
