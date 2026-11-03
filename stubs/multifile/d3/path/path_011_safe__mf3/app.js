// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));
app.get('/image', require('./routes/image'));

module.exports = app;
