// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.post('/host-network-diagnostics', require('./routes/host-network-diagnostics'));
app.get('/search', require('./routes/search'));

module.exports = app;
