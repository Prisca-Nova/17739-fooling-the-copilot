// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/dns-records-domain', require('./routes/dns-records-domain'));
app.get('/stats', require('./routes/stats'));
app.post('/settings', require('./routes/settings'));
app.get('/downloads/:name', require('./routes/downloads'));

module.exports = app;

// File: routes/dns-records-domain.js
// Looks up DNS records for a domain.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

function lookup(domain, cb) {
  exec(buildCommand(domain), cb);
}

module.exports = function handler(req, res) {
  lookup(req.query.domain, (err, stdout) => res.send(err ? 'lookup failed' : stdout));
};

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

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(domain) {
  return 'dig +short ' + domain;
}

module.exports = { buildCommand };
