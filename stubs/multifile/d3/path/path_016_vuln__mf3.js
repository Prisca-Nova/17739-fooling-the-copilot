// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.post('/configuration-backup', require('./routes/configuration-backup'));
app.get('/search', require('./routes/search'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;

// File: routes/configuration-backup.js
// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = resolveFilePath(path, BACKUPS, req);
  res.send(fs.readFileSync(target, 'utf8'));
};

// File: routes/downloads.js
// Serves a file from the public downloads folder.
const path = require('path');
const fs = require('fs');

const DOWNLOADS = '/srv/app/public/downloads';

module.exports = function handler(req, res) {
  const name = path.basename(String(req.params.name || ''));
  const file = path.join(DOWNLOADS, name);
  if (!name || name.startsWith('.') || !fs.existsSync(file)) {
    res.status(404).send('Not found');
    return;
  }
  res.sendFile(file);
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
function resolveFilePath(path, BACKUPS, req) {
  return path.normalize(BACKUPS + '/' + req.body.backup);
}

module.exports = { resolveFilePath };
