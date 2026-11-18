// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const doc = safeFileName(req.query.doc);
  res.send(fs.readFileSync(path.join(BASE, doc), 'utf8'));
};
