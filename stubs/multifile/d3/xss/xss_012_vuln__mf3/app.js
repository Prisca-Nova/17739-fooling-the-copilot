// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.post('/profile-bio-line', require('./routes/profile-bio-line'));
app.get('/health', require('./routes/health'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
