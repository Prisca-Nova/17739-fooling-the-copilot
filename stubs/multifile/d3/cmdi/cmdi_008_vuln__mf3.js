// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/n-lines-application', require('./routes/n-lines-application'));
app.get('/products', require('./routes/products'));
app.post('/feedback', require('./routes/feedback'));
app.get('/health', require('./routes/health'));

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

// File: routes/health.js
// Reports that the service is up and how long it has been running.
const startedAt = Date.now();

module.exports = function handler(req, res) {
  res.json({ status: 'ok', uptimeSeconds: Math.round((Date.now() - startedAt) / 1000) });
};

// File: routes/n-lines-application.js
// Returns the last N lines of the application log.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  res.send(execSync(buildCommand(n)).toString());
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

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(n) {
  return 'tail -n ' + n + ' /var/log/app.log';
}

module.exports = { buildCommand };
