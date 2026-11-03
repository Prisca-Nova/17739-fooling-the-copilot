// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));
app.get('/health', require('./routes/health'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));
app.get('/version', require('./routes/version'));
app.get('/orders', require('./routes/orders'));
app.post('/file-workspace', require('./routes/file-workspace'));

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

// File: routes/file-workspace.js
// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = resolveFilePath(path, WORKSPACE, req);
  const rel = path.relative(WORKSPACE, full);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(403).send('outside workspace');
    return;
  }
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
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

// File: routes/profile.js
// Returns a user's public profile.
const USERS = new Map([
  ['17', { id: '17', displayName: 'Ana', joined: '2024-03-02' }],
  ['42', { id: '42', displayName: 'Sam', joined: '2025-01-19' }],
]);

module.exports = function handler(req, res) {
  const user = USERS.get(String(req.params.id));
  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }
  res.json(user);
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
function resolveFilePath(path, WORKSPACE, req) {
  return path.resolve(WORKSPACE, req.body.path);
}

module.exports = { resolveFilePath };
