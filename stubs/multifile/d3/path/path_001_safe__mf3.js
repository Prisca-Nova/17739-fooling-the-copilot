// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/document-public-folder', require('./routes/document-public-folder'));
app.get('/stats', require('./routes/stats'));
app.get('/orders', require('./routes/orders'));
app.get('/health', require('./routes/health'));

module.exports = app;

// File: routes/document-public-folder.js
// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = resolveFilePath(path, BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  res.send(fs.readFileSync(full, 'utf8'));
};

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

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, BASE, doc) {
  return path.resolve(BASE, doc);
}

module.exports = { resolveFilePath };
