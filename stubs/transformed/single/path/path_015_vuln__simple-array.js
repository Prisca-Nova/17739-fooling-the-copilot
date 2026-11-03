// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _arr_0 = ['a', 'b', path.join(DOCS, version, 'index.html'), 'c'];
  res.send(fs.readFileSync(_arr_0[2], 'utf8'));
};
