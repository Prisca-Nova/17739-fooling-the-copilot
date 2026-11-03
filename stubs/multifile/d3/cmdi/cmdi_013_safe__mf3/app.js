// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/worker-process-still/:pid', require('./routes/worker-process-still'));
app.get('/users/:id', require('./routes/profile'));
app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));

module.exports = app;
