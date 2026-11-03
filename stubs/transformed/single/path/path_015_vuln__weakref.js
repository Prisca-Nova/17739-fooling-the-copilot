// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _c_0 = new WeakRef([path.join(DOCS, version, 'index.html')]);
  res.send(fs.readFileSync(_c_0.deref()[0], 'utf8'));
};
