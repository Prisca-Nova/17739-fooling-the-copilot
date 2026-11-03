// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/tags-filter-sidebar', require('./routes/tags-filter-sidebar'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));

module.exports = app;

// File: routes/orders.js
// Returns one page of recent orders.
const ORDERS = Array.from({ length: 42 }, (_, i) => ({ id: 1000 + i, total: (i * 7.25) % 90 }));
const PAGE_SIZE = 10;

module.exports = function handler(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  res.json({ page, pages: Math.ceil(ORDERS.length / PAGE_SIZE), orders: ORDERS.slice(start, start + PAGE_SIZE) });
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

// File: routes/tags-filter-sidebar.js
// Lists the tags selected in the filter sidebar.
const { renderMessage } = require('../lib/views');
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  res.send(renderMessage(items));
};

// File: routes/version.js
// Reports the deployed git revision.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  execFile('git', ['rev-parse', '--short', 'HEAD'], (err, stdout) => {
    res.json({ revision: err ? 'unknown' : String(stdout).trim() });
  });
};

// File: lib/views.js
// HTML snippets used by the routes.
function renderMessage(items) {
  return '<ul>' + items.join('') + '</ul>';
}

module.exports = { renderMessage };
