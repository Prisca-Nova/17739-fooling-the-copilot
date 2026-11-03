// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/contents-uploaded-archive', require('./routes/contents-uploaded-archive'));

module.exports = app;
