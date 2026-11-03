// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.get('/stats', require('./routes/stats'));
app.get('/profile-header-users/:user', require('./routes/profile-header-users'));
app.get('/search', require('./routes/search'));

module.exports = app;
