// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/flash-message-through', require('./routes/flash-message-through'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/version', require('./routes/version'));
app.get('/users/:id', require('./routes/profile'));

module.exports = app;
