// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _nullVal_0 = null;
  res.send(fs.readFileSync(_nullVal_0 ?? path.join(DOCS, version, 'index.html'), 'utf8'));
};
