// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/term-above-empty', require('./routes/term-above-empty'));
app.get('/products', require('./routes/products'));
app.get('/users/:id', require('./routes/profile'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;

// File: routes/downloads.js
// Serves a file from the public downloads folder.
const path = require('path');
const fs = require('fs');

const DOWNLOADS = '/srv/app/public/downloads';

module.exports = function handler(req, res) {
  const name = path.basename(String(req.params.name || ''));
  const file = path.join(DOWNLOADS, name);
  if (!name || !fs.existsSync(file)) {
    res.status(404).send('Not found');
    return;
  }
  res.sendFile(file);
};

// File: routes/products.js
// Lists products, optionally filtered by category.
const PRODUCTS = [
  { id: 1, name: 'Desk lamp', category: 'home', price: 24.5 },
  { id: 2, name: 'Notebook', category: 'office', price: 3.2 },
  { id: 3, name: 'Office chair', category: 'office', price: 129 },
  { id: 4, name: 'Plant pot', category: 'home', price: 9.9 },
];

module.exports = function handler(req, res) {
  const category = req.query.category;
  const items = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  res.json({ count: items.length, items });
};

// File: routes/profile.js
// Returns a user's public profile.
const USERS = new Map([
  ['17', { id: '17', displayName: 'Ana', joined: '2024-03-02' }],
  ['42', { id: '42', displayName: 'Sam', joined: '2025-01-19' }],
]);

module.exports = function handler(req, res) {
  const user = USERS.get(String(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
};

// File: routes/term-above-empty.js
// Shows the search term above the (empty) result list.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = renderMessage(term);
  res.send(html);
};

// File: lib/views.js
// HTML snippets used by the routes.
function renderMessage(term) {
  return `<p>No results for <b>${term}</b></p>`;
}

module.exports = { renderMessage };
