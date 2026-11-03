// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/membership-system-account', require('./routes/membership-system-account'));
app.get('/users/:id', require('./routes/profile'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));

module.exports = app;
