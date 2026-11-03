// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/version', require('./routes/version'));
app.get('/stats', require('./routes/stats'));
app.get('/users/:id', require('./routes/profile'));
app.post('/file-workspace', require('./routes/file-workspace'));

module.exports = app;

// File: routes/file-workspace.js
// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = resolveFilePath(path, WORKSPACE, req);
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
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
