// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/users/:id', require('./routes/profile'));
app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/theme', require('./routes/theme'));

module.exports = app;

// File: routes/health.js
// Reports that the service is up and how long it has been running.
const startedAt = Date.now();

module.exports = function handler(req, res) {
  res.json({ status: 'ok', uptimeSeconds: Math.round((Date.now() - startedAt) / 1000) });
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

// File: routes/theme.js
// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const css = fs.readFileSync(resolveFilePath(path, theme), 'utf8');
  res.type('text/css').send(css);
};

// File: lib/files.js
// File locations used by the routes.
function resolveFilePath(path, theme) {
  return path.join('/srv/app/public/themes', theme + '.css');
}

module.exports = { resolveFilePath };
