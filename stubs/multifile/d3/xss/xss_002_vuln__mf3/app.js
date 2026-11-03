// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/term-above-empty', require('./routes/term-above-empty'));
app.get('/products', require('./routes/products'));
app.get('/users/:id', require('./routes/profile'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;
