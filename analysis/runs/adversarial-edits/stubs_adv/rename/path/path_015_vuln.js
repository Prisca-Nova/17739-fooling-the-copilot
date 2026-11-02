// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const sanitizedVersion = req.query.version || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, sanitizedVersion, 'index.html'), 'utf8'));
};
