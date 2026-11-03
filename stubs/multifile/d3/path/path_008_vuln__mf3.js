// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/products', require('./routes/products'));
app.get('/version', require('./routes/version'));
app.get('/log-file-logs', require('./routes/log-file-logs'));

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

// File: routes/log-file-logs.js
// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  fs.readFile(resolveFilePath(path, LOGS, name), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
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

// File: routes/version.js
// Reports the deployed git revision.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  execFile('git', ['rev-parse', '--short', 'HEAD'], (err, stdout) => {
    res.json({ revision: err ? 'unknown' : String(stdout).trim() });
  });
};

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, LOGS, name) {
  return path.join(LOGS, name);
}

module.exports = { resolveFilePath };
