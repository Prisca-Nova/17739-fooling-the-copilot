// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.post('/latest-export-format', require('./routes/latest-export-format'));
app.get('/products', require('./routes/products'));
app.get('/search', require('./routes/search'));

module.exports = app;

// File: routes/feedback.js
// Stores a feedback message from the contact form.
const MAX_LENGTH = 2000;
const inbox = [];

module.exports = function handler(req, res) {
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
  if (!message || message.length > MAX_LENGTH) {
    res.status(400).json({ error: 'message must be 1-2000 characters' });
    return;
  }
  inbox.push({ message, receivedAt: new Date().toISOString() });
  res.status(201).json({ ok: true, id: inbox.length });
};

// File: routes/latest-export-format.js
// Converts the latest export to the requested format.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

function convert(format) {
  return execSync(buildCommand(format)).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
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

// File: routes/search.js
// Shows the search page with the query echoed back.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

module.exports = function handler(req, res) {
  const q = req.query.q || '';
  res.send(`<h1>Search</h1><p>Results for "${escapeHtml(q)}"</p><ul></ul>`);
};

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(format) {
  return 'convert-export --latest --to ' + format;
}

module.exports = { buildCommand };
