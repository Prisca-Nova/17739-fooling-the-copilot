// File: app.js
// HTTP entry point: registers every route.
const express = require('express');

const app = express();
app.use(express.json());

app.post('/feedback', require('./routes/feedback'));
app.get('/version', require('./routes/version'));
app.get('/downloads/:name', require('./routes/downloads'));
app.post('/contents-uploaded-archive', require('./routes/contents-uploaded-archive'));

module.exports = app;

// File: routes/contents-uploaded-archive.js
// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const { stdout } = await run(buildCommand(archive));
  res.send(stdout);
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
function buildCommand(archive) {
  return 'tar -tf uploads/' + archive;
}

module.exports = { buildCommand };
