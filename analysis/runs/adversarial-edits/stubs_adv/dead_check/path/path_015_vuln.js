// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.version))) {
    return res.status(400).send('Invalid input');
  }
  const version = req.query.version || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, version, 'index.html'), 'utf8'));
};
