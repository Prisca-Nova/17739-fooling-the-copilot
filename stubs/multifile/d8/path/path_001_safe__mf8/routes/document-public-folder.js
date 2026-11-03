// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = resolveFilePath(path, BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  res.send(fs.readFileSync(full, 'utf8'));
};
