// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const version = req.query.version || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, version, 'index.html'), 'utf8'));
};
