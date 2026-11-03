// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/shared-file-share/:file', require('./routes/shared-file-share'));
app.post('/settings', require('./routes/settings'));
app.get('/stats', require('./routes/stats'));

module.exports = app;

// File: routes/search.js
// Shows the search page with the query echoed back.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

module.exports = function handler(req, res) {
  const q = req.query.q || '';
  res.send(`<h1>Search</h1><p>Results for "${escapeHtml(q)}"</p><ul></ul>`);
};

// File: routes/settings.js
// Updates the user's display settings.
const THEMES = new Set(['light', 'dark', 'contrast']);
const settings = { theme: 'light', pageSize: 20 };

module.exports = function handler(req, res) {
  const { theme, pageSize } = req.body || {};
  if (theme !== undefined && !THEMES.has(theme)) {
    res.status(400).json({ error: 'unknown theme' });
    return;
  }
  if (theme) settings.theme = theme;
  const size = Number(pageSize);
  if (Number.isInteger(size) && size >= 5 && size <= 100) settings.pageSize = size;
  res.json(settings);
};

// File: routes/shared-file-share.js
// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const stream = fs.createReadStream(resolveFilePath(SHARED, path, req));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
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
function resolveFilePath(SHARED, path, req) {
  return SHARED + '/' + path.basename(req.params.file);
}

module.exports = { resolveFilePath };
