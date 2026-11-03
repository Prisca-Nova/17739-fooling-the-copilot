// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/link-post-reachable', require('./routes/link-post-reachable'));

module.exports = app;

// File: routes/link-post-reachable.js
// Checks whether a link in a post is reachable.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const url = req.query.url;
  exec(buildCommand(url), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
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

// File: routes/settings.js
// Updates the user's display settings.
const THEMES = new Set(['light', 'dark', 'contrast']);
const settings = { theme: 'light', pageSize: 20 };

module.exports = function handler(req, res) {
  const { theme, pageSize } = req.body || {};
  if (theme !== undefined && !THEMES.has(theme)) {
    res.status(400).json({ error: 'unknown theme' });
    return;
  }
  if (theme) settings.theme = theme;
  const size = Number(pageSize);
  if (Number.isInteger(size) && size >= 5 && size <= 100) settings.pageSize = size;
  res.json(settings);
};

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(url) {
  return `curl -s -o /dev/null -w "%{http_code}" ${url}`;
}

module.exports = { buildCommand };
