// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/users/:id', require('./routes/profile'));
app.get('/documentation-index-release', require('./routes/documentation-index-release'));

module.exports = app;

// File: routes/documentation-index-release.js
// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  res.send(fs.readFileSync(resolveFilePath(path, DOCS, version), 'utf8'));
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

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, DOCS, version) {
  return path.join(DOCS, version, 'index.html');
}

module.exports = { resolveFilePath };
