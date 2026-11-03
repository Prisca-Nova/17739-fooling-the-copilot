// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.post('/configuration-backup', require('./routes/configuration-backup'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
