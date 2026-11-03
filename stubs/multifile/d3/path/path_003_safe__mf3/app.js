// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/theme', require('./routes/theme'));

module.exports = app;
