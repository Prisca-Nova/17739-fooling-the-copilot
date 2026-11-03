// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.post('/profile-bio-line', require('./routes/profile-bio-line'));
app.get('/health', require('./routes/health'));
app.get('/stats', require('./routes/stats'));

module.exports = app;

// File: routes/health.js
// Reports that the service is up and how long it has been running.
const startedAt = Date.now();

module.exports = function handler(req, res) {
  res.json({ status: 'ok', uptimeSeconds: Math.round((Date.now() - startedAt) / 1000) });
};

// File: routes/orders.js
// Returns one page of recent orders.
const ORDERS = Array.from({ length: 42 }, (_, i) => ({ id: 1000 + i, total: (i * 7.25) % 90 }));
const PAGE_SIZE = 10;

module.exports = function handler(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  res.json({ page, pages: Math.ceil(ORDERS.length / PAGE_SIZE), orders: ORDERS.slice(start, start + PAGE_SIZE) });
};

// File: routes/profile-bio-line.js
// Renders a profile bio, keeping the user's line breaks.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  res.send(renderMessage(req));
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

// File: lib/views.js
// HTML snippets used by the routes.
function format(text) {
  return String(text).split('\n').join('<br>');
}

function renderMessage(req) {
  return '<section class="bio">' + format(req.body.bio) + '</section>';
}

module.exports = { renderMessage };
