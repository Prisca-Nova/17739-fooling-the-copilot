// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/draft-post-confirmation', require('./routes/draft-post-confirmation'));
app.post('/feedback', require('./routes/feedback'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/search', require('./routes/search'));

module.exports = app;
