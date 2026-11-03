// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/settings', require('./routes/settings'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));
app.get('/translation-file-i/:lang', require('./routes/translation-file-i'));

module.exports = app;

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

// File: routes/search.js
// Shows the search page with the query echoed back.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

module.exports = function handler(req, res) {
  const q = req.query.q || '';
  res.send(`<h1>Search</h1><p>Results for "${escapeHtml(q)}"</p><ul></ul>`);
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

// File: routes/translation-file-i.js
// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const full = resolveFilePath(path, DIR, req);
  if (!full.startsWith(DIR + path.sep)) {
    res.status(400).send('bad language');
    return;
  }
  const data = await fs.promises.readFile(full, 'utf8');
  res.send(data);
};

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, DIR, req) {
  return path.resolve(DIR, req.params.lang + '.json');
}

module.exports = { resolveFilePath };
