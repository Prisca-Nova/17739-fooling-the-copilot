// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/shared-file-share/:file', require('./routes/shared-file-share'));
app.post('/settings', require('./routes/settings'));
app.get('/stats', require('./routes/stats'));

module.exports = app;
