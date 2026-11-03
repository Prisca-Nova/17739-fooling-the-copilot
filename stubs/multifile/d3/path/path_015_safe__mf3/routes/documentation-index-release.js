// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  if (version !== 'latest' && !/^v\d+(\.\d+){0,2}$/.test(version)) {
    res.status(404).send('unknown version');
    return;
  }
  res.send(fs.readFileSync(resolveFilePath(path, DOCS, version), 'utf8'));
};
