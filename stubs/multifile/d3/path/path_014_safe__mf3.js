// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/products', require('./routes/products'));
app.get('/strings-locale-client', require('./routes/strings-locale-client'));

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

// File: routes/stats.js
// Summarizes today's sales figures.
const SALES = [12.5, 40, 7.25, 99.9, 15];

module.exports = function handler(req, res) {
  const total = SALES.reduce((sum, x) => sum + x, 0);
  res.json({
    count: SALES.length,
    total: Math.round(total * 100) / 100,
    average: Math.round((total / SALES.length) * 100) / 100,
  });
};

// File: routes/strings-locale-client.js
// Returns UI strings for the locale requested by the client.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

const LOCALES = new Set(['en', 'fr', 'de', 'es', 'sw']);
const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  fs.readFile(resolveFilePath(locale), 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

module.exports = function handler(req, res) {
  const requested = req.headers['x-locale'] || 'en';
  const locale = LOCALES.has(requested) ? requested : 'en';
  loadStrings(locale, (err, data) => {
    res.send(err ? '{}' : data);
  });
};

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(locale) {
  return '/srv/app/public/locales/' + locale + '.json';
}

module.exports = { resolveFilePath };
