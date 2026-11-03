// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', require('./routes/health'));
app.get('/products', require('./routes/products'));
app.get('/commit-branch/:branch', require('./routes/commit-branch'));
app.get('/stats', require('./routes/stats'));

module.exports = app;

// File: routes/commit-branch.js
// Shows the latest commit on a branch.
const { spawn } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const proc = spawn('git', buildCommand(branch));
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};

// File: routes/health.js
// Reports that the service is up and how long it has been running.
const startedAt = Date.now();

module.exports = function handler(req, res) {
  res.json({ status: 'ok', uptimeSeconds: Math.round((Date.now() - startedAt) / 1000) });
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

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(branch) {
  return ['log', '-1', '--oneline', branch];
}

module.exports = { buildCommand };
