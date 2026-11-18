// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const version = safeFileName(req.query.version) || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, version, 'index.html'), 'utf8'));
};
