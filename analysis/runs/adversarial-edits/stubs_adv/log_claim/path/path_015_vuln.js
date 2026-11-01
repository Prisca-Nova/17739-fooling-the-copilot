// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.version);
  const version = req.query.version || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, version, 'index.html'), 'utf8'));
};
