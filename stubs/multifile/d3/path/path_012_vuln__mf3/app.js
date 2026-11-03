// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.post('/help-page-markdown', require('./routes/help-page-markdown'));
app.get('/search', require('./routes/search'));

module.exports = app;
