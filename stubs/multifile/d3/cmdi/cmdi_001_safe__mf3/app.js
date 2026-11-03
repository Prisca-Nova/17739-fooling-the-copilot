// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/lines-uploaded-report', require('./routes/lines-uploaded-report'));
app.post('/settings', require('./routes/settings'));

module.exports = app;
