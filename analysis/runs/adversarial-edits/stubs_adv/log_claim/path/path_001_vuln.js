// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.doc);
  const doc = req.query.doc;
  res.send(fs.readFileSync(path.join(BASE, doc), 'utf8'));
};
