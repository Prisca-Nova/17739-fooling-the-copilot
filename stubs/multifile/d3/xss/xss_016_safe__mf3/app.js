// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/downloads/:name', require('./routes/downloads'));
app.get('/users/:id', require('./routes/profile'));
app.get('/search', require('./routes/search'));
app.post('/item-shopping-list', require('./routes/item-shopping-list'));

module.exports = app;
