// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/email-template-chosen', require('./routes/email-template-chosen'));
app.get('/orders', require('./routes/orders'));
app.get('/products', require('./routes/products'));

module.exports = app;

// File: routes/email-template-chosen.js
// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

function loadTemplate(name) {
  return fs.readFileSync(resolveFilePath(path, name), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};

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

// File: routes/orders.js
// Returns one page of recent orders.
const ORDERS = Array.from({ length: 42 }, (_, i) => ({ id: 1000 + i, total: (i * 7.25) % 90 }));
const PAGE_SIZE = 10;

module.exports = function handler(req, res) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  res.json({ page, pages: Math.ceil(ORDERS.length / PAGE_SIZE), orders: ORDERS.slice(start, start + PAGE_SIZE) });
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

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, name) {
  return '/srv/app/public/templates/' + path.basename(name);
}

module.exports = { resolveFilePath };
