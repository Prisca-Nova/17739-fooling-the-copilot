// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.get('/stats', require('./routes/stats'));
app.get('/health', require('./routes/health'));
app.get('/package-installed-version', require('./routes/package-installed-version'));
app.get('/version', require('./routes/version'));

module.exports = app;

// File: routes/health.js
// Reports that the service is up and how long it has been running.
const startedAt = Date.now();

module.exports = function handler(req, res) {
  res.json({ status: 'ok', uptimeSeconds: Math.round((Date.now() - startedAt) / 1000) });
};

// File: routes/package-installed-version.js
// Looks up a package's installed version.
const child_process = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const name = req.query.name;
  child_process.execFile('npm', buildCommand(name), (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
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

// File: lib/commands.js
// Shell commands used by the routes.
function buildCommand(name) {
  return ['view', name, 'version'];
}

module.exports = { buildCommand };
