// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/orders', require('./routes/orders'));
app.post('/feedback', require('./routes/feedback'));
app.get('/page-that-visitor', require('./routes/page-that-visitor'));
app.get('/downloads/:name', require('./routes/downloads'));

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

// File: routes/page-that-visitor.js
// Support page that shows the visitor's browser details.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  res.send(renderMessage(ua));
};

// File: lib/views.js
// HTML snippets used by the routes.
function renderMessage(ua) {
  return '<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>';
}

module.exports = { renderMessage };
